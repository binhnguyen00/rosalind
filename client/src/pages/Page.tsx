import { DefaultLayout } from "@components";

export function Page() {
  return (
    <DefaultLayout>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl font-bold">
          Page
        </p>
      </div>
    </DefaultLayout>
  );
}