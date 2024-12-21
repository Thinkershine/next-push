"use client";

import React from "react";
import CanvasComponent from "./canvas";

export type Point = {
  x: number;
  y: number;
};

export default function Tetris() {
  return (
    <>
      <div>
        <CanvasComponent width={300} height={600} />
      </div>
    </>
  );
}
