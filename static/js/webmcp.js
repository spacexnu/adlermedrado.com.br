(function () {
  "use strict";

  var modelContext =
    document.modelContext ||
    (window.navigator && window.navigator.modelContext);

  if (!modelContext) {
    return;
  }

  var controller = new AbortController();

  var tools = [
    {
      name: "search_site_content",
      title: "Search site content",
      description:
        "Search public pages and posts on adlermedrado.com.br by title and summary.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            minLength: 1,
            maxLength: 200,
            description: "Case-insensitive text to find in titles and summaries.",
          },
          limit: {
            type: "integer",
            minimum: 1,
            maximum: 20,
            default: 10,
            description: "Maximum number of results to return.",
          },
        },
        required: ["query"],
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: true,
      },
      execute: async function (input) {
        var query = String(input.query || "").trim().toLocaleLowerCase();
        var limit = Number.isInteger(input.limit) ? input.limit : 10;

        if (!query) {
          throw new TypeError("query must not be empty");
        }

        limit = Math.max(1, Math.min(limit, 20));

        var response = await fetch("/index.json", {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          throw new Error("content index request failed: " + response.status);
        }

        var index = await response.json();
        var matches = index.items
          .filter(function (item) {
            return (
              item.title.toLocaleLowerCase().includes(query) ||
              item.summary.toLocaleLowerCase().includes(query)
            );
          })
          .slice(0, limit);

        return {
          query: input.query,
          count: matches.length,
          matches: matches,
        };
      },
    },
    {
      name: "get_current_page",
      title: "Get current page",
      description:
        "Return the canonical URL, title, and description of the current page.",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: true,
      },
      execute: function () {
        var canonical = document.querySelector('link[rel="canonical"]');
        var description = document.querySelector('meta[name="description"]');

        return {
          url: canonical ? canonical.href : window.location.href,
          title: document.title,
          description: description ? description.content : "",
        };
      },
    },
  ];

  if (typeof modelContext.registerTool === "function") {
    tools.forEach(function (tool) {
      Promise.resolve(
        modelContext.registerTool(tool, { signal: controller.signal })
      ).catch(function () {
        // Early-preview implementations can reject unsupported annotations.
      });
    });
  } else if (typeof modelContext.provideContext === "function") {
    modelContext.provideContext({ tools: tools });
  }

  window.addEventListener(
    "pagehide",
    function () {
      controller.abort();
    },
    { once: true }
  );
})();
