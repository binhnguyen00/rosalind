import { useAsyncList } from "react-stately";

import { DefaultLayout } from "@components";

export default function Home() {
  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch("https://swapi.py4e.com/api/people/?search", {
        signal,
      });
      let json = await res.json();
      return {
        items: json.results,
      };
    },
  });

  return (
    <DefaultLayout>
      <div className="space-y-4">
        <p className="text-2xl font-bold text-center">
          React + Vite + TailwindCSS + HeroUI
        </p>
      </div>
    </DefaultLayout>
  );
}