import { DefaultLayout } from "@components";

export function NotFound() {
  return (
    <DefaultLayout>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-2xl font-bold">404 - Page Not Found</p>
      </div>
    </DefaultLayout>
  );
}
