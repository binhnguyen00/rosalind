import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DefaultLayout } from "@components";

export default function Resume() {
  return (
    <DefaultLayout className="p-4 h-screen">
      <div className="grid grid-cols-[1fr_3fr_1fr] gap-4 h-full">
        <div className="border border-divider rounded">
          left
        </div>
        <div className="border border-divider rounded overflow-hidden">
          <ArtBoard />
        </div>
        <div className="border border-divider rounded">
          right
        </div>
      </div>
    </DefaultLayout>
  )
}

function ArtBoard() {
  return (
    <TransformWrapper
      centerOnInit
      maxScale={2}
      minScale={0.4}
      initialScale={0.8}
      limitToBounds={false}
    >
      <TransformComponent
        wrapperStyle={{ width: "100% !important", height: "100% !important" }}
        wrapperClass="w-full h-full"
        contentClass="grid items-start justify-center pointer-events-none"
      >
        <img
          src="https://images.pexels.com/photos/34106378/pexels-photo-34106378.jpeg" alt="test"
        />
      </TransformComponent>
    </TransformWrapper>
  )
}