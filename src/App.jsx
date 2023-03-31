import { useEffect, useState } from "react";
import patternMobile from "./assets/pattern-divider-mobile.svg";
import patternDesktop from "./assets/pattern-divider-desktop.svg";
import Dice from "./assets/icon-dice.svg";
import { SyncLoader } from "react-spinners";
const API = "	https://api.adviceslip.com/advice";

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchApiData = async () => {
    try {
      setLoading(true);

      const response = await fetch(API);
      const json = await response.json();

      setAdvice(json.slip);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <main className="advice-card">
      <h1 className="advice-card__heading">Advice {loading ? "#???" : `#${advice.id}`}</h1>
      {loading ? (
        <SyncLoader color="#52ffa8" margin="0.5rem" className="advice-card__loader"></SyncLoader>
      ) : (
        <p className="advice-card__text">"{advice.advice}"</p>
      )}

      <picture>
        <source media="(min-width: 780px)" srcSet={patternDesktop} />
        <img className="advice-card__img" src={patternMobile} alt="" />
      </picture>

      <button className="advice-card__button" onClick={fetchApiData} aria-label="generate advice">
        <img src={Dice} alt="" className="advice-card__dice"></img>
      </button>
    </main>
  );
}

export default App;
