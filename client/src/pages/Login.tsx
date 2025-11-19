import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { cn, Input, Button, Card, CardBody } from "@heroui/react";

export default function Login() {
  const [isPassword, setIsPassword] = React.useState(false);
  const toggleVisibility = () => setIsPassword((visible) => !visible);

  return (
    <div className="flex items-center justify-center h-screen p-4 bg-default-100">
      <Card className="w-full max-w-sm shadow-md">
        <CardBody className="flex flex-col gap-4 p-6">
          <h1 className="text-xl font-semibold text-center">Login</h1>

          <Input
            label="User" variant="bordered"
            onChange={(e) => console.log(e.target.value)}
          />

          <Input
            label="Password" variant="bordered"
            type={isPassword ? "text" : "password"}
            onChange={(e) => console.log(e.target.value)}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isPassword ? (
                  <EyeClosed className="text-2xl text-default-400" />
                ) : (
                  <Eye className="text-2xl text-default-400" />
                )}
              </button>
            }
          />

          <Button color="primary" className="mt-2">
            Sign In
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
