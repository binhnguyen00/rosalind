import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";

import { PocketBaseContext } from "@components";
import { Button, Form } from "@heroui/react";

export default function Profile() {
  const navigate = useNavigate()
  const { client, logout } = React.useContext(PocketBaseContext)
  const profile = client.authStore.record;

  const onSignIn = () => {
    navigate("/sign-in");
  }

  const onSignOut = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logout();
    navigate("/");
  }

  const SignIn = () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-start h-full w-full">
        <p className="text-xl font-medium"> You are not signed in </p>
        <Button variant="solid" color="primary" className="w-1/2 space-x-2 text-lg" onPress={onSignIn}>
          <LogIn size={20} />
          <span> Sign In </span>
        </Button>
      </div>
    )
  }

  if (!client.authStore.isValid) return <SignIn />;
  if (!profile) return <SignIn />;

  return (
    <Form
      onSubmit={onSignOut}
      className="flex flex-col gap-4 items-center justify-between h-full w-full"
    >
      <p className="text-2xl font-bold"> {profile.name} </p>
      <Button
        variant="bordered" color="primary" type="submit"
        className="w-1/3 space-x-2 text-lg"
      >
        <LogOut size={20} />
        <span> Sign Out </span>
      </Button>
    </Form>
  )
}