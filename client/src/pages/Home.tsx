import React from "react";
import { DefaultLayout } from "@components";
import { PocketBaseContext } from "@/src/components/PBProvider";
import { Button } from "@heroui/react";

export default function Home() {
  const pb = React.useContext(PocketBaseContext);

  const testAuth = async () => {
    await pb.send("/test-auth", { method: "GET" })
  }

  return (
    <DefaultLayout>
      <div className="space-y-4">
        <p className="text-2xl font-bold text-center">
          React + Vite + TailwindCSS + HeroUI
        </p>
      </div>
      <Button onPress={testAuth}>
        Test Auth
      </Button>
    </DefaultLayout>
  );
}