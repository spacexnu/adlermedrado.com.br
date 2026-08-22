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

function assertLocale(path, locale) {
  const html = read(path);
  const escapedLocale = locale.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  assert.match(html, new RegExp(`<html\\s+lang=(?:"${escapedLocale}"|${escapedLocale})(?:\\s|>)`));
}

function testThemeToggle() {
  const attributes = new Map();
  const documentListeners = {};
  const buttonListeners = {};
  const button = {
    addEventListener(name, listener) {
      buttonListeners[name] = listener;
    },
    setAttribute(name, value) {
      this[name] = value;
    },
  };
  const document = {
    addEventListener(name, listener) {
      documentListeners[name] = listener;
    },
    documentElement: {
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
    getElementById(id) {
      return id === "theme-toggle" ? button : null;
    },
  };
  const saved = new Map([["theme", "light"]]);
  const localStorage = {
    getItem(key) {
      return saved.get(key) ?? null;
    },
    setItem(key, value) {
      saved.set(key, value);
    },
  };

  vm.runInNewContext(read("js/theme-toggle.js"), {
    document,
    localStorage,
    String,
  });

  assert.equal(attributes.get("data-theme"), "light");
  documentListeners.DOMContentLoaded();
  assert.equal(button["aria-pressed"], "false");
  buttonListeners.click();
  assert.equal(attributes.has("data-theme"), false);
  assert.equal(saved.get("theme"), "dark");
  assert.equal(button["aria-pressed"], "true");
}

function testMobileNavigation() {
  const documentListeners = {};
  const buttonListeners = {};
  const navigationClasses = new Set();
  const rootClasses = new Set();
  const button = {
    addEventListener(name, listener) {
      buttonListeners[name] = listener;
    },
    focus() {
      this.focused = true;
    },
    setAttribute(name, value) {
      this[name] = value;
    },
  };
  const navigation = {
    classList: {
      contains(name) {
        return navigationClasses.has(name);
      },
      toggle(name, enabled) {
        if (enabled) {
          navigationClasses.add(name);
        } else {
          navigationClasses.delete(name);
        }
      },
    },
  };
  const document = {
    addEventListener(name, listener) {
      documentListeners[name] = listener;
    },
    documentElement: {
      classList: {
        add(name) {
          rootClasses.add(name);
        },
      },
    },
    getElementById(id) {
      return id === "primary-navigation" ? navigation : null;
    },
    querySelector(selector) {
      return selector === ".menu-toggle" ? button : null;
    },
    readyState: "complete",
  };

  vm.runInNewContext(read("js/mobile-navigation.js"), { document, String });

  assert.ok(rootClasses.has("js-navigation"));
  buttonListeners.click();
  assert.equal(button["aria-expanded"], "true");
  assert.ok(navigationClasses.has("is-open"));
  documentListeners.keydown({ key: "Escape" });
  assert.equal(button["aria-expanded"], "false");
  assert.ok(!navigationClasses.has("is-open"));
  assert.equal(button.focused, true);
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
  /class=(?:"menu-toggle"|menu-toggle) type=(?:"button"|button) aria-controls=(?:"primary-navigation"|primary-navigation) aria-expanded=(?:"false"|false)>menu/
);
assert.match(home, /id=(?:"primary-navigation"|primary-navigation)/);
assert.match(
  home,
  /id=(?:"theme-toggle"|theme-toggle) type=(?:"button"|button) aria-label="Dark mode" aria-pressed=(?:"true"|true)/
);

testThemeToggle();
testMobileNavigation();
