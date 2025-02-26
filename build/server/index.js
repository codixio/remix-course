import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, redirect } from "@remix-run/node";
import { RemixServer, NavLink, Outlet, Meta, Links, ScrollRestoration, Scripts, Link, useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import fs from "fs/promises";
import fs2 from "fs";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const styles$2 = "/assets/main-5wgR5NVb.css";
function MainNavigation() {
  return /* @__PURE__ */ jsx("nav", { id: "main-navigation", children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/", children: "Home" }) }),
    /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(NavLink, { to: "/notes", children: "My Notes" }) })
  ] }) });
}
const meta$1 = () => [
  {
    charset: "utf-8",
    title: "Quick Notes App",
    viewport: "width=device-width,initial-scale=1"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx(MainNavigation, {}) }),
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
function links$4() {
  return [{ rel: "stylesheet", href: styles$2 }];
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links: links$4,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const homeStyles = "/assets/home-tbXErwgJ.css";
const meta = () => {
  return [
    { title: "Quick Notes App" },
    { name: "description", content: "Easily keep track of your notes!" }
  ];
};
const links$3 = () => [
  { rel: "stylesheet", href: homeStyles }
];
function Index() {
  return /* @__PURE__ */ jsxs("main", { id: "content", children: [
    /* @__PURE__ */ jsx("h1", { children: "Keeping track of your notes never was easier" }),
    /* @__PURE__ */ jsx("p", { children: "Use our quick notes app to keep track of your notes, free of charge!" }),
    /* @__PURE__ */ jsx("p", { id: "cta", children: /* @__PURE__ */ jsx(Link, { to: "/notes", children: "Try it!" }) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  links: links$3,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const styles$1 = "/assets/NewNote-C_0hQBxx.css";
function NewNote() {
  const data = useActionData();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  return /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", id: "note-form", action: "/notes", children: [
    (data == null ? void 0 : data.message) && /* @__PURE__ */ jsx("p", { children: data.message }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "title", children: "Title" }),
      /* @__PURE__ */ jsx("input", { type: "text", id: "title", name: "title", required: true })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "content", children: "Content" }),
      /* @__PURE__ */ jsx("textarea", { id: "content", name: "content", rows: 5, required: true })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "form-actions", children: /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Adding..." : "Add Note" }) })
  ] });
}
function links$2() {
  return [{ rel: "stylesheet", href: styles$1 }];
}
const NOTES_FILE = "data.json";
async function getStoredNotes() {
  if (!fs2.existsSync(NOTES_FILE)) {
    await fs.writeFile(NOTES_FILE, JSON.stringify({ notes: [] }));
    return [];
  } else {
    const rawFileContent = await fs.readFile(NOTES_FILE, { encoding: "utf-8" });
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.notes ?? [];
    return storedNotes;
  }
}
function storeNotes(notes) {
  return fs.writeFile(NOTES_FILE, JSON.stringify({ notes: notes || [] }));
}
const styles = "/assets/NoteList-COrfCza5.css";
NoteList.defaultProps = {
  notes_list: []
};
function NoteList({ notes_list }) {
  return /* @__PURE__ */ jsx("ul", { id: "note-list", children: notes_list.map((note, index) => /* @__PURE__ */ jsx("li", { className: "note", children: /* @__PURE__ */ jsxs("article", { children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsxs("ul", { className: "note-meta", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          "#",
          index + 1
        ] }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("time", { dateTime: note.id, children: new Date(note.id).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) }) })
      ] }),
      /* @__PURE__ */ jsx("h2", { children: note.title })
    ] }),
    /* @__PURE__ */ jsx("p", { children: note.content })
  ] }) }, note.id)) });
}
function links$1() {
  return [{ rel: "stylesheet", href: styles }];
}
function NotesPage() {
  const notes = useLoaderData();
  return /* @__PURE__ */ jsxs("main", { children: [
    /* @__PURE__ */ jsx(NewNote, {}),
    /* @__PURE__ */ jsx(NoteList, { notes_list: notes })
  ] });
}
async function loader() {
  const notes = await getStoredNotes();
  return notes;
}
async function action({ request }) {
  const formData = await request.formData();
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
    id: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (noteData.title.trim().length < 5) {
    return { message: "Title must be at least 5 characters long" };
  }
  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}
function links() {
  return [...links$2(), ...links$1()];
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: NotesPage,
  links,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BKyG25x3.js", "imports": ["/assets/components-6IuxtyGk.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DL19B-hE.js", "imports": ["/assets/components-6IuxtyGk.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-aqGnkouk.js", "imports": ["/assets/components-6IuxtyGk.js"], "css": [] }, "routes/notes": { "id": "routes/notes", "parentId": "root", "path": "notes", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/notes-DoCaQMua.js", "imports": ["/assets/components-6IuxtyGk.js"], "css": [] } }, "url": "/assets/manifest-aed90cbe.js", "version": "aed90cbe" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/notes": {
    id: "routes/notes",
    parentId: "root",
    path: "notes",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
