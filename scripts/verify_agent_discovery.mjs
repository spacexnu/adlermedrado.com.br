import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const buildDir = process.argv[2];

if (!buildDir) {
  throw new Error("build directory argument is required");
}

function readJson(path) {
  return JSON.parse(readFileSync(join(buildDir, path), "utf8"));
}

const catalog = readJson(".well-known/api-catalog");
const openapi = readJson(".well-known/openapi.json");
const contentIndex = readJson("index.json");
const skillsIndex = readJson(".well-known/agent-skills/index.json");
const skill = readFileSync(
  join(buildDir, ".well-known/agent-skills/site-content/SKILL.md")
);

assert.ok(Array.isArray(catalog.linkset) && catalog.linkset.length > 0);
assert.equal(openapi.openapi, "3.1.0");
assert.ok(Array.isArray(contentIndex.items) && contentIndex.items.length > 0);
assert.equal(
  skillsIndex.$schema,
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json"
);
assert.ok(Array.isArray(skillsIndex.skills) && skillsIndex.skills.length === 1);

const actualDigest = `sha256:${createHash("sha256")
  .update(skill)
  .digest("hex")}`;
assert.equal(skillsIndex.skills[0].digest, actualDigest);

const webmcpSource = readFileSync(join(buildDir, "js/webmcp.js"), "utf8");
const registrations = [];
const modelContext = {
  registerTool(tool, options) {
    registrations.push({ tool, options });
    return Promise.resolve();
  },
};
const browserGlobals = {
  AbortController,
  document: {
    modelContext,
    querySelector() {
      return null;
    },
    title: "Test page",
  },
  fetch,
  window: {
    addEventListener() {},
    location: { href: "https://adlermedrado.com.br/" },
    navigator: {},
  },
};

vm.runInNewContext(webmcpSource, browserGlobals);

assert.deepEqual(
  registrations.map(({ tool }) => tool.name),
  ["search_site_content", "get_current_page"]
);
assert.ok(
  registrations.every(
    ({ options }) => options.signal instanceof AbortSignal
  )
);

let providedTools = [];
vm.runInNewContext(webmcpSource, {
  AbortController,
  document: {
    querySelector() {
      return null;
    },
    title: "Test page",
  },
  fetch,
  window: {
    addEventListener() {},
    location: { href: "https://adlermedrado.com.br/" },
    navigator: {
      modelContext: {
        provideContext(context) {
          providedTools = context.tools;
        },
      },
    },
  },
});

assert.deepEqual(
  [...providedTools].map((tool) => tool.name),
  ["search_site_content", "get_current_page"]
);
