import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";
import leftArrowImage from "./assets/leftarrow.png";

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const hadleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos");
    }
  };

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla para índice de massa corporal, é uma medida
            internacional usada para calcular se uma pessoa está no peso ideal
          </p>
          <input
            type="number"
            placeholder="Digite a sua altura. Ex 1.5 (em metros)"
            value={heightField > 0 ? heightField : ""}
            onChange={(e) => setHeightField(parseFloat(e.currentTarget.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder="Digite a seu peso. Ex 73.5 (em kg)"
            value={weightField > 0 ? weightField : ""}
            onChange={(e) => setWeightField(parseFloat(e.currentTarget.value))}
            disabled={toShow ? true : false}
          />

          <button
            disabled={toShow ? true : false}
            onClick={hadleCalculateButton}
          >
            Calcular{" "}
          </button>
        </div>

        {/* Lado direito */}
        <div className={styles.rightSide}>
          {/* se o to show estivver null/false mostra os 4 campos*/}
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          )}
          {/* se estiver com algo pra mostrar faz o card grande */}
          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow}>
                <img
                  src={leftArrowImage}
                  alt=""
                  width={25}
                  onClick={handleBackButton}
                />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
