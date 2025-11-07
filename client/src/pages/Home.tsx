import { DefaultLayout } from "@components";

export function Home() {
  return (
    <DefaultLayout>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl font-bold">
          React + Vite + TailwindCSS + HeroUI
        </p>
      </div>
    </DefaultLayout>
  );
}