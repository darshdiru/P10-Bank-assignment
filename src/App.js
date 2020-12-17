import React from "react";
import styles from "./App.module.scss";
import MutualFunds from "./contents/MutualFunds";
import { Settings } from "./utils/constants";

function App() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.head}>
        <h2>{Settings.ALLFUNDS}</h2>
      </header>
      <main>
        <MutualFunds />
      </main>
    </div>
  );
}

export default App;
