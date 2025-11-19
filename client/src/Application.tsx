import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "@heroui/react";

const Home = lazy(() => import("@pages/Home"));
const NotFound = lazy(() => import("@pages/NotFound"));
const ResumeBuilder = lazy(() => import("@pages/ResumeBuilder"));
const Login = lazy(() => import("@src/pages/Signin"));

export function App() {
  return (
    <Suspense fallback={<div className="p-6 flex items-center justify-center"><Spinner /></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/resume/new" element={<ResumeBuilder />} />
        <Route path="/resume/:id" element={<ResumeBuilder />} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </Suspense>
  );
}