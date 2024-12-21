"use client";

import { useRef, useEffect, useState } from "react";
import { Point } from "./tetris";
import Keyboard from "./keyboard";
import TetrisPlayerPortfolio from "./tetrisPlayerPortfolio";

type CanvasProps = {
  width: number;
  height: number;
};

export type CryptoScore = {
  score: number;
  btc: number;
  eth: number;
  trx: number;
  usdt: number;
  vtc: number;
  ltc: number;
  xmr: number;
};

type Images = {
  [key: number]: HTMLImageElement;
};

const CanvasComponent: React.FC<CanvasProps> = ({
  width,
  height,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const images: Images = [];

  let blockTypes = 8;
  for (let i = 0; i < blockTypes; i += 1) {
    let image = new Image();
    image.src = "/crypto-blocks-graphics/highscores/" + i + ".svg";
    images[i] = image;
  }

  const [btc, setBtc] = useState(0);
  const [eth, setEth] = useState(0);
  const [trx, setTrx] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [vtc, setVtc] = useState(0);
  const [xmr, setXmr] = useState(0);
  const [ltc, setLtc] = useState(0);
  const [score, setScore] = useState(0);

  const DROP_SLOW = 200;
  const DROP_FAST = 50;
  let dropCounter = 0;
  let dropInterval = DROP_SLOW;
  const pieces = "ILJOTSZ";
  let playerMatrix: number[][] = createPiece(
    pieces[(pieces.length * Math.random()) | 0]
  );
  let arenaMatrix: number[][] = createArenaMatrix(10, 20);
  const resetPosition: Point = {
    x: ((arenaMatrix[0].length / 2) | 0) - ((playerMatrix[0].length / 2) | 0),
    y: 0,
  };
  let playerPos: Point = { x: 5, y: 5 }; //resetPosition;

  function createPiece(type: string): number[][] {
    switch (type) {
      case "T":
        return [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
        ]; // BTC
      case "O":
        return [
          [2, 2],
          [2, 2],
        ]; // ETH
      case "L":
        return [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3],
        ]; // LTC
      case "J":
        return [
          [0, 4, 0],
          [0, 4, 0],
          [4, 4, 0],
        ]; // TRX
      case "I":
        return [
          [0, 5, 0, 0],
          [0, 5, 0, 0],
          [0, 5, 0, 0],
          [0, 5, 0, 0],
        ]; // USDT
      case "S":
        return [
          [0, 6, 6],
          [6, 6, 0],
          [0, 0, 0],
        ]; // VTC
      case "Z":
        return [
          [7, 7, 0],
          [0, 7, 7],
          [0, 0, 0],
        ]; // XMR
      default:
        return [];
    }
  }

  function createArenaMatrix(width: number, height: number): number[][] {
    const matrix = [];
    while (height !== 0) {
      matrix.push(new Array(width).fill(0));
      height -= 1;
    }

    return matrix;
  }

  function getNewPieceForPlayer() {
    playerMatrix = createPiece(pieces[(pieces.length * Math.random()) | 0]);
    playerPos.x = resetPosition.x;
    playerPos.y = resetPosition.y;

    // CHECK IF GAMEOVER....
    // IF SO STOP PLAYING & DISPLAY SCORE...
    if (playerCollidesArena(arenaMatrix, playerMatrix)) {
      clearArena(); // wbudowane klocki czarne sie straja..
      // this.setHighScore();
      // this.setMinedCrypto();
      // this.cryptoScore.score = 0;
      // this.tetris.updateScore(this.cryptoScore);
    }
  }

  function clearArena() {
    arenaMatrix.forEach((row) => row.fill(0));
  }

  function updatePlayerMatrix(deltaTime: number) {
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      drop();
    }
  }

  function drop() {
    playerPos.y += 1;
    if (playerCollidesArena(arenaMatrix, playerMatrix)) {
      playerPos.y -= 1;
      mergePlayerIntoArena(playerMatrix);

      // create new piece
      getNewPieceForPlayer();

      sweep();
      // this.cryptoScore = sweep(this.cryptoScore);
      // this.tetris.updateScore(this.cryptoScore);
      //  this.cryptoScore = this.arena.sweep(this.cryptoScore);
      //  this.tetris.updateScore(this.cryptoScore);
    }
    dropCounter = 0;
  }

  function sweep() {
    let rowCount = 1;

    let previousBlock = "";
    let currentBlock = "";
    let wholeLineCounter = 0;
    let countedBlocks: CryptoScore = {
      score: 0,
      btc: 0,
      eth: 0,
      ltc: 0,
      trx: 0,
      usdt: 0,
      vtc: 0,
      xmr: 0,
    };

    outer: for (let y = arenaMatrix.length - 1; y > 0; y -= 1) {
      previousBlock = "";
      wholeLineCounter = 0;
      for (let x = 0; x < arenaMatrix[y].length; x += 1) {
        // Col Loop
        switch (arenaMatrix[y][x]) {
          case 0:
            continue outer;
          case 1:
            currentBlock = "btc";
            break;
          case 2:
            currentBlock = "eth";
            break;
          case 3:
            currentBlock = "ltc";
            break;
          case 4:
            currentBlock = "trx";
            break;
          case 5:
            currentBlock = "usdt";
            break;
          case 6:
            currentBlock = "vtc";
            break;
          case 7:
            currentBlock = "xmr";
            break;
        }

        if (previousBlock === "") {
          previousBlock = currentBlock;
          wholeLineCounter += 1;
        } else {
          if (currentBlock === previousBlock) {
            wholeLineCounter += 1;
          }
        }

        const wholeLine = 12;
        if (wholeLineCounter == wholeLine) {
          // ADD BONUS To Block Reward
          switch (previousBlock) {
            case "btc":
              countedBlocks.btc += wholeLine;
              break;
            case "eth":
              countedBlocks.eth += wholeLine;
              break;
            case "ltc":
              countedBlocks.ltc += wholeLine;
              break;
            case "trx":
              countedBlocks.trx += wholeLine;
              break;
            case "usdt":
              countedBlocks.usdt += wholeLine;
              break;
            case "vtc":
              countedBlocks.vtc += wholeLine;
              break;
            case "xmr":
              countedBlocks.xmr += wholeLine;
              break;
          }
        }
      }

      // If no 0 in any column within a row
      // Remove completed row
      const splicedRow = arenaMatrix.splice(y, 1)[0];
      const row = splicedRow.map((value) => 0);
      arenaMatrix.unshift(row);
      y += 1;

      // Continue Here and Give points
      countedBlocks.score += rowCount * 10;

      countedBlocks = countCryptoBlocks(splicedRow, countedBlocks);

      setBtc(btc + rowCount * countedBlocks.btc);
      setEth(eth + rowCount * countedBlocks.eth);
      setLtc(ltc + rowCount * countedBlocks.ltc);
      setTrx(trx + rowCount * countedBlocks.trx);
      setUsdt(usdt + rowCount * countedBlocks.usdt);
      setVtc(vtc + rowCount * countedBlocks.vtc);
      setXmr(xmr + rowCount * countedBlocks.xmr);
      setScore(score + rowCount * 10);

      console.log("CpountedBlocks Score: " + JSON.stringify(countedBlocks));
      rowCount *= 2;
    }
  }

  function countCryptoBlocks(
    finishedRow: number[],
    countedBlocks: CryptoScore
  ) {
    for (let i = 0; i < finishedRow.length; i += 1) {
      switch (finishedRow[i]) {
        case 1:
          countedBlocks.btc += 1;
          break;
        case 2:
          countedBlocks.eth += 1;
          break;
        case 3:
          countedBlocks.ltc += 1;
          break;
        case 4:
          countedBlocks.trx += 1;
          break;
        case 5:
          countedBlocks.usdt += 1;
          break;
        case 6:
          countedBlocks.vtc += 1;
          break;
        case 7:
          countedBlocks.xmr += 1;
          break;
      }
    }

    return countedBlocks;
  }

  function playerCollidesArena(arena: number[][], player: number[][]) {
    const [matrix, offset] = [player, playerPos];
    for (let y = 0; y < matrix.length; y += 1) {
      for (let x = 0; x < matrix[y].length; x += 1) {
        if (
          matrix[y][x] !== 0 &&
          (arena[y + offset.y] && arena[y + offset.y][x + offset.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function mergePlayerIntoArena(player: number[][]) {
    player.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arenaMatrix[y + playerPos.y][x + playerPos.x] = value;
        }
      });
    });
  }

  function movePlayer(direction: number) {
    playerPos.x += direction;
    if (playerCollidesArena(arenaMatrix, playerMatrix)) {
      playerPos.x -= direction;
    }
  }

  function playerDrop(speed: string) {
    if (speed === "fast") {
      dropInterval = DROP_FAST;
    } else if (speed === "slow") {
      dropInterval = DROP_SLOW;
    }

    drop();
  }

  function rotatePlayer(direction: number) {
    const pos = playerPos.x;
    let offset = 1;
    rotatePlayerMatrix(direction);
    while (playerCollidesArena(arenaMatrix, playerMatrix)) {
      playerPos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > playerMatrix[0].length) {
        rotatePlayerMatrix(-direction);
        playerPos.x = pos;
        return;
      }
    }
  }

  function rotatePlayerMatrix(dir: number) {
    for (let y = 0; y < playerMatrix.length; y += 1) {
      for (let x = 0; x < y; x += 1) {
        [playerMatrix[x][y], playerMatrix[y][x]] = [
          playerMatrix[y][x],
          playerMatrix[x][y],
        ];
      }
    }
    if (dir > 0) {
      playerMatrix.forEach((row) => row.reverse());
    } else {
      playerMatrix.reverse();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Your canvas drawing code here
        context.scale(30, 30);
        context.fillStyle = "red";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const colors: string[] = [
          "black", //"#FF0D72", // BTC
          "silver", //"#0DC2FF", // ETH
          "white", // "#0DFF72", // LTC
          "red", // "#F538FF", // TRX
          "#FF8E0D", // USDT
          "#FFE138", // VTC
          "#3877FF", // XMR
        ];

        // 0 - xrp
        // 1 - btc
        // 2 - eth
        // 3 - ltc
        // 4 - trx
        // 5 - usdt
        // 6 - vtc
        // 7 - xmr

        let lastTime = 0;
        const update = (time = 0) => {
          const deltaTime = time - lastTime;
          lastTime = time;

          updatePlayerMatrix(deltaTime);

          draw();
          requestAnimationFrame(update);
        };

        update();

        function draw() {
          if (context === null || canvas === null) {
            return;
          }
          context.fillStyle = "#000";
          context.fillRect(0, 0, canvas.width, canvas.height);
          drawMatrix(arenaMatrix, { x: 0, y: 0 });
          drawMatrix(playerMatrix, playerPos);
        }

        function drawMatrix(matrix: number[][], offset: Point) {
          if (context === null) {
            return;
          }

          matrix.forEach((row, y) => {
            row.forEach((value, x) => {
              if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
                drawImage(value, { x: x + offset.x, y: y + offset.y });
              }
            });
          });
        }

        function drawImage(currency: number, pos: Point) {
          if (context === null) {
            return;
          }
          // console.log("IMAGE " + images[currency]);
          context.drawImage(images[currency], pos.x, pos.y, 1, 1);
        }

        draw();
      }
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2">
        <div>
          <canvas ref={canvasRef} width={width} height={height}></canvas>
        </div>
        <div>
          <Keyboard
            onPlayerMove={movePlayer}
            onPlayerRotate={rotatePlayer}
            onPlayerDrop={playerDrop}
          />
          <TetrisPlayerPortfolio
            btc={btc}
            eth={eth}
            trx={trx}
            ltc={ltc}
            usdt={usdt}
            vtc={vtc}
            xmr={xmr}
            score={score}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
