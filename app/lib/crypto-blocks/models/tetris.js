class Tetris {
  constructor(element) {
    this.images = [];

    let blockTypes = 8;
    for (let i = 0; i < blockTypes; i += 1) {
      let newImage = new Image(2, 2);
      newImage.src = "/static/graphics/" + i + ".svg";
      this.images.push(newImage);
    }

    this.element = element;
    this.canvas = element.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.context.scale(120, 120);

    this.arena = new Arena(12, 20);
    this.player = new TetrisPlayer(this);

    this.colors = [
      null,
      "black", //"#FF0D72", // BTC
      "silver", //"#0DC2FF", // ETH
      "white", // "#0DFF72", // LTC
      "red", // "#F538FF", // TRX
      "#FF8E0D", // USDT
      "#FFE138", // VTC
      "#3877FF" // XMR
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

      this.player.update(deltaTime);

      this.draw();
      requestAnimationFrame(update);
    };

    update();
    this.updateScore({
      score: 0,
      btc: 0,
      eth: 0,
      ltc: 0,
      trx: 0,
      usdt: 0,
      vtc: 0,
      xmr: 0
    });
  }

  draw() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
    this.drawMatrix(this.player.matrix, this.player.pos);
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = this.colors[value];
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
          this.drawImage(value, { x: x + offset.x, y: y + offset.y });
        }
      });
    });
  }

  drawImage(currency, pos) {
    this.context.drawImage(this.images[currency], pos.x, pos.y, 1, 1);
  }

  // This Method for Utils Extraction
  formatCryptoScore(score) {
    const cryptoPointValue = 0.001;
    let cryptocurrenciedScore = score * cryptoPointValue;
    return parseFloat(Math.round(cryptocurrenciedScore * 1000) / 1000).toFixed(
      4
    );
  }

  updateScore(cryptoScore) {
    this.formatCryptoScore(cryptoScore.eth);
    this.element.querySelector(".score").innerText = cryptoScore.score;
    this.element.querySelector(".btc-score").innerText = this.formatCryptoScore(
      cryptoScore.btc
    );
    this.element.querySelector(".eth-score").innerText = this.formatCryptoScore(
      cryptoScore.eth
    );
    this.element.querySelector(".trx-score").innerText = this.formatCryptoScore(
      cryptoScore.trx
    );
    this.element.querySelector(
      ".usdt-score"
    ).innerText = this.formatCryptoScore(cryptoScore.usdt);
    this.element.querySelector(".vtc-score").innerText = this.formatCryptoScore(
      cryptoScore.vtc
    );
    this.element.querySelector(".ltc-score").innerText = this.formatCryptoScore(
      cryptoScore.ltc
    );
    this.element.querySelector(".xmr-score").innerText = this.formatCryptoScore(
      cryptoScore.xmr
    );
  }
}
