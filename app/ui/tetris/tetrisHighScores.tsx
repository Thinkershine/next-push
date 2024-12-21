// import ls from "local-storage";

export default function TetrisHighScores() {
  // const [highScores] = useState(ls.get("HIGHSCORES"));

  // const displayHighScores = (hs) => {
  //   var toReturn = hs.map((score, index) => (
  //     <li key={score.toString() + index} style={{ textAlign: "left" }}>
  //       <b style={{ marginRight: 25 }}>{index + 1}</b> {score}
  //     </li>
  //   ));
  //   return toReturn;
  // };

  return (
    <>
      <div id="high-scores">
        <h2>HighScores</h2>
        {/* <ul>{highScores !== null && displayHighScores(highScores)}</ul> */}
      </div>
    </>
  );
}
