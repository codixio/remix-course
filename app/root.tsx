import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError
} from "@remix-run/react";
import styles from '~/styles/main.css?url';
import MainNavigation from "~/components/MainNavigation";

export const meta = () => [
  {
    charset: "utf-8",
    title: "Quick Notes App",
    viewport: "width=device-width,initial-scale=1",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 200) {
      return (
        <main className="info">
          <p>{error.data}</p>
        </main>
      );
    }
    else { 
      return (
        <main className="error">
          <h1>Oops! Something went wrong</h1>
          <p><strong>Error: </strong>{error.status} {error.statusText}</p>
          <p>{error.data}</p>
          <p><Link to="/">Return to the homepage</Link></p>
        </main>
      );
    }
  } else if (error instanceof Error) {
    return (
      <main className="error">
        <h1>Oops! Something went wrong</h1>
        <p><strong>Error: </strong>{error.message}</p>
        <p><Link to="/">Return to the homepage</Link></p>
      </main>
    );
  } else {
    return (
      <main className="error">
        <h1>Oops! Something went wrong</h1>
        <p><strong>Error: </strong>An unknown error occurred</p>
        <p><Link to="/">Return to the homepage</Link></p>
      </main>
    );
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}