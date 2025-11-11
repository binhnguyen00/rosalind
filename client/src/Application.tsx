import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "@heroui/react";

const Home = lazy(() => import("@pages/Home"));
const NotFound = lazy(() => import("@pages/NotFound"));
const Resume = lazy(() => import("@pages/Resume"));
const ArtBoard = lazy(() => import("@pages/ArtBoard"));

export function App() {
  return (
    <Suspense fallback={<div className="p-6 flex items-center justify-center"><Spinner /></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/resume/new" element={<Resume />} />
        <Route path="/artboard" element={<ArtBoard />} />
      </Routes>
    </Suspense>
  );
}