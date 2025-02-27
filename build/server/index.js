import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, redirect } from "@remix-run/node";
import { RemixServer, NavLink, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, Link, useLoaderData, useFetcher } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import fs from "fs/promises";
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
const styles$3 = "/assets/main-5wgR5NVb.css";
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
function ErrorBoundary$1() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 200) {
      return /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("p", { className: "info-message", children: error.data }) });
    } else {
      return /* @__PURE__ */ jsxs("main", { className: "error", children: [
        /* @__PURE__ */ jsx("h1", { children: "Oops! Something went wrong" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Error: " }),
          error.status,
          " ",
          error.statusText
        ] }),
        /* @__PURE__ */ jsx("p", { children: error.data }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to the homepage" }) })
      ] });
    }
  } else if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("main", { className: "error", children: [
      /* @__PURE__ */ jsx("h1", { children: "Oops! Something went wrong" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Error: " }),
        error.message
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to the homepage" }) })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("main", { className: "error", children: [
      /* @__PURE__ */ jsx("h1", { children: "Oops! Something went wrong" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Error: " }),
        "An unknown error occurred"
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to the homepage" }) })
    ] });
  }
}
function links$5() {
  return [{ rel: "stylesheet", href: styles$3 }];
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  Layout,
  default: App,
  links: links$5,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const styles$2 = "/assets/note-details-BY0IxxDA.css";
const NOTES_FILE = "data.json";
async function getStoredNotes() {
  try {
    const rawFileContent = await fs.readFile(NOTES_FILE, {
      encoding: "utf-8"
    });
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.notes ?? [];
    return storedNotes;
  } catch {
    return [];
  }
}
async function storeNotes(notes) {
  return fs.writeFile(NOTES_FILE, JSON.stringify({ notes: notes || [] }));
}
function NoteDetailsPage() {
  const note = useLoaderData();
  return /* @__PURE__ */ jsxs("main", { id: "note-details", children: [
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx(Link, { to: "/notes", children: "Back to all notes" }) }),
    /* @__PURE__ */ jsx("h1", { children: (note == null ? void 0 : note.title) || "No title" }),
    /* @__PURE__ */ jsx("p", { id: "note-details-content", children: (note == null ? void 0 : note.content) || "No content" })
  ] });
}
async function action$1({
  params
}) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);
  return selectedNote;
}
function links$4() {
  return [{ rel: "stylesheet", href: styles$2 }];
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: NoteDetailsPage,
  links: links$4
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
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  links: links$3,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const styles$1 = "/assets/NewNote-C_0hQBxx.css";
function NewNote() {
  const fetcher = useFetcher();
  const data = fetcher.data;
  const isSubmitting = fetcher.state === "submitting";
  return /* @__PURE__ */ jsxs(fetcher.Form, { method: "post", id: "note-form", children: [
    (data == null ? void 0 : data.message) && /* @__PURE__ */ jsx("p", { children: data.message }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "title", children: "Title" }),
      /* @__PURE__ */ jsx("input", { type: "text", id: "title", name: "title", required: true })
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "content", children: "Content" }),
      /* @__PURE__ */ jsx("textarea", { id: "content", name: "content", rows: 5, required: true })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "form-actions", children: /* @__PURE__ */ jsx("button", { disabled: isSubmitting, children: isSubmitting ? "Adding..." : "Add Note" }) })
  ] });
}
function links$2() {
  return [{ rel: "stylesheet", href: styles$1 }];
}
const styles = "/assets/NoteList-COrfCza5.css";
function NoteList({ notes_list }) {
  return /* @__PURE__ */ jsx("ul", { id: "note-list", children: notes_list.map((note, index) => /* @__PURE__ */ jsx("li", { className: "note", children: /* @__PURE__ */ jsx(Link, { to: `/notes/${note.id}`, children: /* @__PURE__ */ jsxs("article", { children: [
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
  ] }) }) }, note.id)) });
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
  if (!notes || notes.length === 0) {
    throw new Response("No notes found yet. Create one above!", { status: 200 });
  }
  return notes;
}
async function action({
  request
}) {
  const formData = await request.formData();
  const noteData = {
    title: formData.get("title"),
    content: formData.get("content"),
    id: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (noteData.title.trim().length < 5) {
    return { message: `Title must be at least 5 characters long` };
  }
  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect("/notes");
}
function ErrorBoundary() {
  const error = useRouteError();
  const response = error;
  if (isRouteErrorResponse(error)) {
    if (error.status === 200) {
      return /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(NewNote, {}),
        /* @__PURE__ */ jsx("p", { className: "info-message", children: error.data })
      ] });
    } else {
      return /* @__PURE__ */ jsxs("main", { className: "error", children: [
        /* @__PURE__ */ jsx("h1", { children: "Oops! Something went wrong" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Error: " }),
          error.status,
          " ",
          error.statusText
        ] }),
        /* @__PURE__ */ jsx("p", { children: error.data }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to the homepage" }) })
      ] });
    }
  } else if (error instanceof Error) {
    return /* @__PURE__ */ jsxs("main", { className: "error", children: [
      /* @__PURE__ */ jsx("h1", { children: "Oops! Something went wrong" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Error: " }),
        error.message
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to the homepage" }) })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("main", { className: "error", children: [
      /* @__PURE__ */ jsx("h1", { children: "Oops! Something went wrong" }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Error: " }),
        response.type || "An unknown error occurred"
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Return to the homepage" }) })
    ] });
  }
}
function links() {
  return [...links$2(), ...links$1()];
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  action,
  default: NotesPage,
  links,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-UbUeO8Zc.js", "imports": ["/assets/components-Bj7dSJl0.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-ZB2ReQqk.js", "imports": ["/assets/components-Bj7dSJl0.js"], "css": [] }, "routes/notes_.$noteId": { "id": "routes/notes_.$noteId", "parentId": "root", "path": "notes/:noteId", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/notes_._noteId-3PJm5N3Q.js", "imports": ["/assets/components-Bj7dSJl0.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-B1zLmfNf.js", "imports": ["/assets/components-Bj7dSJl0.js"], "css": [] }, "routes/notes": { "id": "routes/notes", "parentId": "root", "path": "notes", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/notes-awZuIYDs.js", "imports": ["/assets/components-Bj7dSJl0.js"], "css": [] } }, "url": "/assets/manifest-695e7d24.js", "version": "695e7d24" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
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
  "routes/notes_.$noteId": {
    id: "routes/notes_.$noteId",
    parentId: "root",
    path: "notes/:noteId",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/notes": {
    id: "routes/notes",
    parentId: "root",
    path: "notes",
    index: void 0,
    caseSensitive: void 0,
    module: route3
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
