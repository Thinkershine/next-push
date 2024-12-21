class Arena {
  constructor(width, height) {
    const matrix = [];
    while (height !== 0) {
      matrix.push(new Array(width).fill(0));
      height -= 1;
    }
    this.matrix = matrix;
  }

  clear() {
    this.matrix.forEach(row => row.fill(0));
  }

  collide(player) {
    const [matrix, offset] = [player.matrix, player.pos];
    for (let y = 0; y < matrix.length; y += 1) {
      for (let x = 0; x < matrix[y].length; x += 1) {
        if (
          matrix[y][x] !== 0 &&
          (this.matrix[y + offset.y] &&
            this.matrix[y + offset.y][x + offset.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  merge(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  sweep(cryptoScore) {
    let rowCount = 1;

    let previousBlock = "";
    let currentBlock = "";
    let wholeLineCounter = 0;
    let countedBlocks = {
      btc:0,
      eth:0,
      ltc:0,
      trx:0,
      usdt:0,
      vtc:0,
      xmr:0
    }

    outer: for (let y = this.matrix.length - 1; y > 0; y -= 1) {
      previousBlock = "";
      wholeLineCounter = 0;
      for (let x = 0; x < this.matrix[y].length; x += 1) {
        // Col Loop
        switch (this.matrix[y][x]) {
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
              cryptoScore.btc += wholeLine;
              break;
            case "eth":
              cryptoScore.eth += wholeLine;
              break;
            case "ltc":
              cryptoScore.ltc += wholeLine;
              break;
            case "trx":
              cryptoScore.trx += wholeLine;
              break;
            case "usdt":
              cryptoScore.usdt += wholeLine;
              break;
            case "vtc":
              cryptoScore.vtc += wholeLine;
              break;
            case "xmr":
              cryptoScore.xmr += wholeLine;
              break;
          }
        }
      }

      // If no 0 in any column within a row
      // Remove completed row
      const splicedRow = this.matrix.splice(y, 1)[0];
      const row = splicedRow.map(value => 0);
      this.matrix.unshift(row);
      y += 1;
      
      // Continue Here and Give points
      cryptoScore.score += rowCount * 10;
      
      countedBlocks = this.countCryptoBlocks(splicedRow, countedBlocks);
      cryptoScore.btc += rowCount * countedBlocks.btc; 
      cryptoScore.eth += rowCount * countedBlocks.eth;
      cryptoScore.ltc += rowCount * countedBlocks.ltc;
      cryptoScore.trx += rowCount * countedBlocks.trx;
      cryptoScore.usdt += rowCount * countedBlocks.usdt;
      cryptoScore.vtc += rowCount * countedBlocks.vtc;
      cryptoScore.xmr += rowCount * countedBlocks.xmr;
      
      rowCount *= 2;
    }

    return cryptoScore;
  }

  countCryptoBlocks(finishedRow, countedBlocks) {
    for(let i = 0; i < finishedRow.length; i += 1) {
      switch(finishedRow[i]){
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
}
