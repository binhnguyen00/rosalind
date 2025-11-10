import { DefaultLayout } from "@components";

export default function Home() {
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