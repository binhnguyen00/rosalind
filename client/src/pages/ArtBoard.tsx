import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ArtBoard() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <TransformWrapper
        centerOnInit
        maxScale={2}
        minScale={0.4}
        initialScale={0.8}
        limitToBounds={false}
      >
        <TransformComponent
          contentClass="grid items-start justify-center pointer-events-none"
          contentStyle={{ width: "100%", height: "100%", overflow: "hidden" }}
          wrapperStyle={{ width: "100%", height: "100%" }}
        >
          <div className="h-full w-full text-center border">
            <p>Artboard</p>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}