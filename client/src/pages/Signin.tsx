import React from "react";
import { Eye, EyeClosed, LogIn } from "lucide-react";

import { Input, Button, Card, CardBody, Form } from "@heroui/react";
import { PocketBaseContext } from "@components";

export default function Signin() {
  const [isPassword, setIsPassword] = React.useState(false);
  const [loginInfo, setLoginInfo] = React.useState({
    userOrEmail: "",
    password: "",
  });

  const { login, isLoggingIn } = React.useContext(PocketBaseContext);

  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginInfo);
  }

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-default-100">
      <Card className="w-full max-w-sm shadow-md">
        <CardBody className="flex flex-col gap-4 p-6">
          <p className="text-xl font-semibold text-center">Sign In</p>

          <Form className="w-full space-y-2" onSubmit={onLogin}>
            <Input
              label="User or Email" variant="bordered"
              value={loginInfo.userOrEmail}
              validate={(value: string) => {
                if (!value.length) return "user or email is required";
                return true;
              }}
              onChange={(e) => setLoginInfo({ ...loginInfo, userOrEmail: e.target.value })}
            />

            <Input
              label="Password" variant="bordered"
              value={loginInfo.password}
              type={isPassword ? "text" : "password"}
              validate={(value: string) => {
                if (!value.length) return "password is required";
                return true;
              }}
              onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
              endContent={
                <button
                  onClick={() => setIsPassword(!isPassword)} type="button"
                  className="focus:outline-none hover:cursor-pointer"
                >
                  {isPassword ? (
                    <EyeClosed size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              }
            />
            <Button color="primary" className="w-full space-x-2" isLoading={isLoggingIn} type="submit">
              <LogIn size={18} />
              <span>Sign In</span>
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
