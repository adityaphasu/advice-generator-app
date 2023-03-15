import { useEffect, useState } from "react";
import patternMobile from "./assets/pattern-divider-mobile.svg";
import patternDesktop from "./assets/pattern-divider-desktop.svg";
import Dice from "./assets/icon-dice.svg";
const API = "	https://api.adviceslip.com/advice";

function App() {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState("");

  const fetchApiData = async () => {
    try {
      const response = await fetch(API);
      const json = await response.json();
      setId(json.slip.id);
      setAdvice(json.slip.advice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <main className="advice-card">
      <h1 className="advice-card__heading">Advice #{id}</h1>
      <p className="advice-card__text">"{advice}"</p>

      <picture>
        <source media="(min-width: 780px)" srcSet={patternDesktop} />
        <img className="advice-card__img" src={patternMobile} alt="" />
      </picture>

      <button className="advice-card__button" onClick={fetchApiData} aria-label="generate advice">
        <img src={Dice} alt=""></img>
      </button>
    </main>
  );
}

export default App;
