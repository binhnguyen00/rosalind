import React from "react";
import { cn, Spinner } from "@heroui/react";

import { useResumeStore } from "@stores";
import { GlobalFontsContext } from "@components";

export default function Fonts() {
  const fontsCtx = React.useContext(GlobalFontsContext);
  const metadata = useResumeStore((state) => state.metadata);
  const updateFont = useResumeStore((state) => state.updateFont);

  if (fontsCtx.isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full aspect-auto pb-4">
        <Spinner className="self-center" />
      </div>
    )
  }

  if (fontsCtx.isError) {
    return (
      <div className="flex flex-col gap-2 w-full aspect-auto pb-4">
        <p className="text-red-500 self-center text-center"> {fontsCtx.error.message} </p>
      </div>
    )
  }

  if (!fontsCtx.fonts) {
    return (
      <div className="flex flex-col gap-2 w-full aspect-auto pb-4">
        <p className="text-red-500 self-center text-center">No fonts found</p>
      </div>
    )
  }

  return (
    <div className={cn(
      "flex flex-col gap-2 w-full",
      "aspect-auto pb-4",
    )}>
      {fontsCtx.fonts.map((font) => (
        <div
          key={font.id}
          className={cn(
            "p-3 rounded-xl",
            "transition-all duration-300 ease-in-out cursor-pointer",
            "active:scale-95",
            "border", "border-divider",
            "hover:border-blue-400", "hover:border-3",
            metadata.font === font.label ? " bg-blue-100" : ""
          )}
          onClick={() => updateFont(font.label)}
        >
          <p className="text-lg" style={{ fontFamily: font.label }}>{font.label}</p>
        </div>
      ))}
    </div>
  )
}