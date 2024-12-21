import { useEffect, useState } from "react";
import { CryptoScore } from "./canvas";

export default function TetrisPlayerPortfolio({
  btc,
  eth,
  trx,
  ltc,
  usdt,
  vtc,
  xmr,
  score,
}: CryptoScore) {
  // const [btcScore, setBtcScore] = useState(btc);

  // useEffect(() => {
  //   setBtcScore(btc);
  //   console.log("btcScore", btcScore);
  // });
  return (
    <div className="rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h2>Portfolio</h2>
      <ul className="flex flex-wrap items-center justify-center text-gray-900 m-6">
        <li className="m-2">
          <p>
            BTC
            <img src="/crypto-blocks-graphics/highscores/1.svg" />
            <span className="m-2">{btc}</span>
          </p>
        </li>
        <li className="m-2">
          <p>
            ETH
            <img src="/crypto-blocks-graphics/highscores/2.svg" />
            <span className="m-2">{eth}</span>
          </p>
        </li>
        <li className="m-2">
          <p>
            TRX
            <img src="/crypto-blocks-graphics/highscores/4.svg" />
            <span className="m-2">{trx}</span>
          </p>
        </li>
        <li className="m-2">
          <p>
            USDT
            <img src="/crypto-blocks-graphics/highscores/5.svg" />
            <span className="m-2">{usdt}</span>
          </p>
        </li>
        <li className="m-2">
          <p>
            VTC
            <img src="/crypto-blocks-graphics/highscores/6.svg" />
            <span className="m-2">{vtc}</span>
          </p>
        </li>
        <li className="m-2">
          <p>
            LTC
            <img src="/crypto-blocks-graphics/highscores/3.svg" />
            <span className="m-2">{ltc}</span>
          </p>
        </li>
        <li className="m-2">
          <p>
            XMR
            <img src="/crypto-blocks-graphics/highscores/7.svg" />
            <span className="m-2">{xmr}</span>
          </p>
        </li>
      </ul>
      <div>
        <h2>SCORE</h2>
        <p className="score">{score}</p>
      </div>
    </div>
  );
}
