import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from './styles/main.css?url';
import MainNavigation from "./components/MainNavigation";

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

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}