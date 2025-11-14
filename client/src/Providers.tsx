import PocketBase from "pocketbase";

import { useHref, useNavigate } from "react-router-dom";
import type { NavigateOptions } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@heroui/react";
import { HeroUIProvider } from "@heroui/system";
import { PBProvider } from "@components";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

const queryClient = new QueryClient();
const pocketBaseClient = new PocketBase("http://127.0.0.1:8090")

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider
        placement="top-right"
        maxVisibleToasts={8}
        toastOffset={76}
        toastProps={{
          radius: "full",
          classNames: {
            base: "p-4 relative",
            title: "font-semibold text-lg",
            description: "text-muted-foreground",
          },
          motionProps: {
            layout: true,
            initial: { opacity: 0, x: 0 },
            transition: { duration: 0.3, ease: "easeOut" }
          }
        }}
      />
      <QueryClientProvider client={queryClient}>
        <PBProvider client={pocketBaseClient}>
          {children}
        </PBProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
