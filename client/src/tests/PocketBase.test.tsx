import axios from "axios";
import PocketBase from "pocketbase";
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PBProvider } from "@components";

const pbClient = new PocketBase("http://127.0.0.1:8090");

describe("PocketBase Provider", () => {
  it("check for server health", async () => {
    const response = await pbClient.health.check();
    await waitFor(() => expect(response.code === 200));
  });

  it("login using default account", async () => {
    const queryClient = new QueryClient();

    const Auth = (): React.ReactNode => {
      useQuery({
        queryKey: ["auth-store"],
        queryFn: async () => await pbClient.collection("users").authWithPassword("binh.nguyen@gmail.com", "123456789"),
      })

      return (
        <div> {pbClient.authStore.isValid} </div>
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

  it("test authorized request", async () => {
    const response = await axios.get(`${pbClient.baseURL}/test-auth`, {
      headers: { "Authorization": pbClient.authStore.token }
    })
    await waitFor(() => expect(response.data === "Welcome!"))
  });
});