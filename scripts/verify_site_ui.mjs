import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const buildDir = process.argv[2];

if (!buildDir) {
  throw new Error("build directory argument is required");
}

function read(path) {
  return readFileSync(join(buildDir, path), "utf8");
}

// Font declarations must resolve to real, locally served WOFF2 assets.
const fontFaces = [...read("css/styles.css").matchAll(/@font-face\s*\{([^}]+)\}/g)];
assert.ok(fontFaces.length > 0, "Self-hosted font declarations are missing");
for (const [, face] of fontFaces) {
  assert.match(face, /font-family:\s*"JetBrains Mono"/);
  assert.match(face, /font-display:\s*swap/);
  const source = face.match(/url\(["']?(\/fonts\/[^\s)"']+)/)?.[1];
  assert.ok(source, "Font must load from a local /fonts/ URL");
  const font = readFileSync(join(buildDir, source.slice(1)));
  assert.equal(font.subarray(0, 4).toString("ascii"), "wOF2", source);
}
assert.match(read("fonts/jetbrains-mono/OFL.txt"), /SIL Open Font License/);

function assertLocale(path, locale) {
  const html = read(path);
  const escapedLocale = locale.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(`<html\\s+lang=(?:"${escapedLocale}"|${escapedLocale})(?:\\s|>)`));
}

function themeDocument(buttons, attributes) {
  return {
    addEventListener(name, listener) {
      this.listeners[name] = listener;
    },
    listeners: {},
    documentElement: {
      style: {},
      getAttribute(name) {
        return attributes.get(name) ?? null;
      },
      removeAttribute(name) {
        attributes.delete(name);
      },
      setAttribute(name, value) {
        attributes.set(name, value);
      },
    },
    querySelectorAll() {
      return buttons;
    },
    readyState: "complete",
  };
}

function themeButton() {
  return {
    getAttribute(name) {
      return this[name] ?? null;
    },
    querySelector() {
      return { textContent: "" };
    },
    setAttribute(name, value) {
      this[name] = value;
    },
  };
}

function runTheme(document, localStorage, media) {
  vm.runInNewContext(read("js/theme-toggle.js"), {
    document,
    localStorage,
    window: { matchMedia: () => media },
    String,
  });
}

function testThemeToggle() {
  const attributes = new Map();
  const button = themeButton();
  const document = themeDocument([button], attributes);
  const saved = new Map([["theme", "light"]]);
  const media = { matches: false, addEventListener() {} };
  runTheme(document, {
    getItem(key) {
      return saved.get(key) ?? null;
    },
    setItem(key, value) {
      saved.set(key, value);
    },
  }, media);

  assert.equal(attributes.get("data-theme"), "light");
  assert.equal(button["aria-pressed"], "false");
  document.listeners.click({
    target: { closest: () => button },
  });
  assert.equal(attributes.get("data-theme"), "dark");
  assert.equal(saved.get("theme"), "dark");
  assert.equal(button["aria-pressed"], "true");
}

function testThemeWithoutStorage() {
  const attributes = new Map();
  const button = themeButton();
  const document = themeDocument([button], attributes);
  const listeners = [];
  const media = {
    matches: false,
    addEventListener(name, listener) {
      listeners.push(listener);
    },
  };
  runTheme(document, {
    getItem() {
      throw new Error("storage blocked");
    },
    setItem() {
      throw new Error("storage blocked");
    },
  }, media);

  assert.equal(attributes.get("data-theme"), "dark");
  document.listeners.click({
    target: { closest: () => button },
  });
  assert.equal(attributes.get("data-theme"), "light");
  media.matches = true;
  listeners.forEach((listener) => listener());
  assert.equal(attributes.get("data-theme"), "light");
}

function testMobileNavigation() {
  const buttonListeners = {};
  const dialogListeners = {};
  const rootClasses = new Set();
  const closeButton = {
    focus() { this.focused = true; document.activeElement = this; },
    getClientRects() { return [{}]; },
  };
  const lastLink = {
    focus() { document.activeElement = this; },
    getClientRects() { return [{}]; },
  };
  const button = {
    addEventListener(name, listener) {
      buttonListeners[name] = listener;
    },
    setAttribute(name, value) {
      this[name] = value;
    },
  };
  const dialog = {
    open: false,
    showModal() {
      this.open = true;
    },
    close() {
      this.open = false;
      dialogListeners.close?.();
    },
    addEventListener(name, listener) {
      dialogListeners[name] = listener;
    },
    querySelector() {
      return closeButton;
    },
    querySelectorAll(selector) {
      return selector.startsWith('a[href]') ? [closeButton, lastLink] : [];
    },
  };
  const document = {
    addEventListener() {},
    documentElement: {
      classList: {
        add(name) {
          rootClasses.add(name);
        },
        contains(name) {
          return rootClasses.has(name);
        },
        remove(name) {
          rootClasses.delete(name);
        },
      },
    },
    getElementById(id) {
      return id === "site-menu" ? dialog : null;
    },
    querySelector(selector) {
      return selector === ".menu-toggle" ? button : null;
    },
    readyState: "complete",
  };

  vm.runInNewContext(read("js/mobile-navigation.js"), {
    document,
    window: { matchMedia: () => ({ matches: false, addEventListener() {} }) },
    String,
  });

  assert.ok(rootClasses.has("js-navigation"));
  assert.ok(rootClasses.has("menu-open") === false);
  buttonListeners.click();
  assert.equal(button["aria-expanded"], "true");
  assert.ok(rootClasses.has("menu-open"));
  assert.equal(closeButton.focused, true);
  let prevented = 0;
  dialogListeners.keydown({ key: 'Tab', shiftKey: true, preventDefault() { prevented++; } });
  assert.equal(document.activeElement, lastLink, 'Shift+Tab wraps to the final modal link');
  dialogListeners.keydown({ key: 'Tab', shiftKey: false, preventDefault() { prevented++; } });
  assert.equal(document.activeElement, closeButton, 'Tab wraps to the close button');
  assert.equal(prevented, 2, 'Focus must not leave the modal at either boundary');
  dialog.close();
  assert.equal(button["aria-expanded"], "false");
  assert.ok(!rootClasses.has("menu-open"));
}

const index = JSON.parse(read("index.json"));
assert.equal(index.version, "1.0");
assert.equal(typeof index.title, "string");
assert.equal(typeof index.url, "string");
assert.ok(Array.isArray(index.items));

const expectedLocales = new Map([
  ["/posts/tornando-meu-site-agent-ready/", "pt-BR"],
  ["/posts/making-my-site-agent-ready/", "en"],
  ["/missives/video-sobre-o-meu-site/", "pt-BR"],
  ["/about/", "en"],
]);

for (const [pathname, locale] of expectedLocales) {
  const item = index.items.find(({ url }) => new URL(url).pathname === pathname);
  assert.equal(item?.language, locale, `Content API locale for ${pathname}`);
}

assertLocale("posts/tornando-meu-site-agent-ready/index.html", "pt-BR");
assertLocale("posts/making-my-site-agent-ready/index.html", "en");
assertLocale("missives/video-sobre-o-meu-site/index.html", "pt-BR");
assertLocale("languages/portuguese/index.html", "pt-BR");
assertLocale("languages/english/index.html", "en");
assertLocale("about/index.html", "en");

const notFound = read("404.html");
assert.equal((notFound.match(/<main(?:\s|>)/g) || []).length, 1);

const home = read("index.html");
assert.match(
  home,
  /class=(?:"menu-toggle"|menu-toggle) type=(?:"button"|button) aria-controls=(?:"site-menu"|site-menu) aria-expanded=(?:"false"|false)>MENU/
);
assert.match(home, /id=(?:"site-menu"|site-menu)/);
assert.match(home, /data-theme-toggle/);
assert.match(home, /data-log-switch/);
assert.match(home, /id=(?:"site-index"|site-index)/);
assert.match(read("css/styles.css"), /menu-open[\s\S]{0,80}overflow:\s*hidden/);

testThemeToggle();
testThemeWithoutStorage();
testMobileNavigation();
