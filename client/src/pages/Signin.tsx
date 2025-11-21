import React from "react";
import { create } from "zustand";
import { ArrowLeft, Eye, EyeClosed, LogIn } from "lucide-react";

import { Input, Button, Form } from "@heroui/react";
import { PocketBaseContext } from "@components";

interface SignFormStore {
  mode: "signIn" | "signUp";
  setMode: (mode: SignFormStore["mode"]) => void;
  signInInfo: { userOrEmail: string; password: string; }
  setSignInInfo: (info: SignFormStore["signInInfo"]) => void;
  signUpInfo: { name: string; email: string; password: string; passwordConfirm: string; }
  setSignUpInfo: (info: SignFormStore["signUpInfo"]) => void;
}

const useSigninStore = create<SignFormStore>((set, get) => ({
  mode: "signIn",
  setMode: (mode: SignFormStore["mode"]) => set({ mode }),
  signInInfo: {
    userOrEmail: "",
    password: "",
  },
  setSignInInfo: (info: SignFormStore["signInInfo"]) => set({ signInInfo: info }),
  signUpInfo: {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  },
  setSignUpInfo: (info: SignFormStore["signUpInfo"]) => set({ signUpInfo: info }),
}));

export default function Signin() {
  const { mode } = useSigninStore();

  return (
    <div className="flex min-h-screen">

      {/* left */}
      <div className="hidden lg:flex lg:w-2/3 relative overflow-hidden rounded-r-2xl">
        <img
          alt="Login hero"
          src="https://w.wallhaven.cc/full/rq/wallhaven-rqr1xw.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm mb-6">
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight text-shadow-black">
              Welcome Back
            </h1>
            <p className="text-lg text-white/90 max-w-md text-shadow-black">
              Sign in to continue your journey with us. Access your dashboard and manage everything in one place.
            </p>
          </div>
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Secure Access</p>
                <p className="text-xs text-white/70">Your data is encrypted and protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex flex-col flex-1 items-center justify-center p-12 gap-6 relative">
        {mode === "signIn" ? (
          <div className="w-full self-start animate-fade-in space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Sign In</h2>
            <p className="text-muted-foreground text-lg">Enter your credentials to access your account</p>
          </div>
        ) : (
          <div className="w-full self-start animate-fade-in space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Sign Up</h2>
            <p className="text-muted-foreground text-lg">Enter your credentials to create an account</p>
          </div>
        )}
        {mode === "signIn" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}

function SignInForm() {
  const { setMode, signInInfo, setSignInInfo } = useSigninStore();
  const [isPassword, setIsPassword] = React.useState(false);
  const pocketbase = React.useContext(PocketBaseContext);

  const onSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pocketbase.signIn(signInInfo);
  }

  return (
    <>
      <Form className="w-full self-start space-y-6" onSubmit={onSignIn}>
        <Input
          label="Your Email" variant="bordered" size="lg"
          value={signInInfo.userOrEmail}
          validate={(value: string) => {
            if (!value.length) return "Email is required";
            return true;
          }}
          onChange={(e) => setSignInInfo({ ...signInInfo, userOrEmail: e.target.value })}
        />

        <Input
          label="Password" variant="bordered" size="lg"
          value={signInInfo.password}
          type={isPassword ? "text" : "password"}
          validate={(value: string) => {
            if (!value.length) return "password is required";
            return true;
          }}
          onChange={(e) => setSignInInfo({ ...signInInfo, password: e.target.value })}
          endContent={
            <button
              onClick={() => setIsPassword(!isPassword)} type="button"
              className="focus:outline-none hover:cursor-pointer"
            >
              {isPassword ? (
                <EyeClosed size={24} />
              ) : (
                <Eye size={24} />
              )}
            </button>
          }
        />

        <div className="flex justify-start gap-2 w-full">
          <Button color="primary" className="w-full space-x-2" isLoading={pocketbase.isSigningIn} type="submit" size="lg">
            <LogIn size={18} />
            <span>Sign In</span>
          </Button>

          <Button
            variant="faded" size="lg"
            className="font-semibold text-primary hover:text-primary/80 transition-colors w-full"
          >
            Forgot Password?
          </Button>
        </div>
      </Form>

      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <p>Don't have an account?</p>
        <button
          className="font-semibold text-primary hover:text-primary/80 hover:cursor-pointer transition-colors self-center w-full"
          onClick={() => setMode("signUp")}
        >
          Sign up for free
        </button>
      </div>
    </>
  )
}

function SignUpForm() {
  const { setMode, signUpInfo, setSignUpInfo } = useSigninStore();
  const [isPassword1, setIsPassword1] = React.useState(false);
  const [isPassword2, setIsPassword2] = React.useState(false);
  const pocketbase = React.useContext(PocketBaseContext);

  const onSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pocketbase.signUp({
      name: signUpInfo.name,
      email: signUpInfo.email,
      userOrEmail: signUpInfo.email,
      password: signUpInfo.password,
      passwordConfirm: signUpInfo.passwordConfirm,
    });
    setMode("signIn");
  }

  const onBack = () => {
    setMode("signIn");
  }

  return (
    <>
      <div className="absolute top-3 left-3">
        <Button variant="faded" isIconOnly size="lg" onPress={onBack}>
          <ArrowLeft size={24} />
        </Button>
      </div>

      <Form className="w-full self-start space-y-6" onSubmit={onSignup}>
        <Input
          label="Your Name" variant="bordered" size="lg"
          value={signUpInfo.name}
          validate={(value: string) => {
            if (!value.length) return "Name is required";
            return true;
          }}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, name: e.target.value })}
        />

        <Input
          label="Your Email" variant="bordered" size="lg"
          value={signUpInfo.email}
          validate={(value: string) => {
            if (!value.length) return "Email is required";
            return true;
          }}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, email: e.target.value })}
        />

        <Input
          label="Password" variant="bordered" size="lg"
          value={signUpInfo.password}
          type={isPassword1 ? "text" : "password"}
          validate={(value: string) => {
            if (!value.length) return "password is required";
            return true;
          }}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, password: e.target.value })}
          endContent={
            <button
              onClick={() => setIsPassword1(!isPassword1)} type="button"
              className="focus:outline-none hover:cursor-pointer"
            >
              {isPassword1 ? (
                <EyeClosed size={24} />
              ) : (
                <Eye size={24} />
              )}
            </button>
          }
        />

        <Input
          label="Confirm Password" variant="bordered" size="lg"
          value={signUpInfo.passwordConfirm}
          type={isPassword2 ? "text" : "password"}
          validate={(value: string) => {
            if (!value.length) return "password is required";
            if (value !== signUpInfo.password) return "passwords do not match";
            return true;
          }}
          onChange={(e) => setSignUpInfo({ ...signUpInfo, passwordConfirm: e.target.value })}
          endContent={
            <button
              onClick={() => setIsPassword2(!isPassword2)} type="button"
              className="focus:outline-none hover:cursor-pointer"
            >
              {isPassword2 ? (
                <EyeClosed size={24} />
              ) : (
                <Eye size={24} />
              )}
            </button>
          }
        />

        <Button color="primary" className="w-1/2 self-center" isLoading={pocketbase.isSigningUp} type="submit" size="lg">
          <span>Sign Up</span>
        </Button>
      </Form>
    </>
  )
}