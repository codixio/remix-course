import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from "../styles/home.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Quick Notes App" },
    { name: "description", content: "Easily keep track of your notes!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeStyles },
];

export default function Index() {
  return (
    <main id="content">
      <h1>Keeping track of your notes never was easier</h1>
      <p>Use our quick notes app to keep track of your notes, free of charge!</p>
      <p id="cta">
        <Link to="/notes">Try it!</Link>
      </p>
    </main>
  );
}
