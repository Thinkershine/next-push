"use client";

import React, { useEffect } from "react";

type KeyboardProps = {
  onPlayerMove: (value: number) => void;
  onPlayerRotate: (value: number) => void;
  onPlayerDrop: (value: string) => void;
};

export default function Keyboard(props: KeyboardProps) {
  const { onPlayerMove, onPlayerRotate, onPlayerDrop } = props;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let keyBindings: string[][] = [];
      console.log(e.key);
      let onePlayer = true;
      if (onePlayer) {
        keyBindings = [["KeyA", "KeyD", "KeyQ", "KeyE", "KeyS"]];
      } else {
        keyBindings = [
          ["KeyA", "KeyD", "KeyQ", "KeyE", "KeyS"],
          //   [72, 75, 89, 73, 74],
        ];
      }

      keyBindings.forEach((key) => {
        if (e.type === "keydown") {
          if (e.code === key[0]) {
            onPlayerMove(-1);
          } else if (e.code === key[1]) {
            onPlayerMove(1);
          } else if (e.code === key[2]) {
            onPlayerRotate(-1);
          } else if (e.code === key[3]) {
            onPlayerRotate(1);
          }
        }

        if (e.code === key[4]) {
          if (e.type === "keydown") {
            onPlayerDrop("fast");
          } else {
            onPlayerDrop("slow");
          }
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="controls">
      <h2>Controls</h2>
      <p>A, D - Move Left & Right</p>
      <p>Q, E - Rotate Left & Right </p>
      <p>S - Drop</p>
    </div>
  );
}
