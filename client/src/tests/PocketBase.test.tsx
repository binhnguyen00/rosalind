import PocketBase from "pocketbase";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PBProvider } from "@components";

describe("PocketBase Provider", () => {
  it("auto login on mount", async () => {
    const queryClient = new QueryClient();
    const pbClient = new PocketBase("http://127.0.0.1:8090");

    const Auth = (): React.ReactNode => {
      useQuery({
        queryKey: ["auth-store"],
        queryFn: async () => await pbClient.collection("users").authWithPassword("binh.nguyen@gmail.com", "123456789"),
      })

      return (
        <div>
          {pbClient.authStore.isValid}
        </div>
      )
    }

    render(
      <QueryClientProvider client={queryClient}>
        <PBProvider client={pbClient}>
          <Auth />
        </PBProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(pbClient.authStore.isValid).toBe(true);
    })
  });
});