import FadeLoader from "react-spinners/FadeLoader";
import styles from './spinner.module.scss'

const overrideCss = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner() {
  const color = '#d834a4'

  return (
    <div>
      <FadeLoader
        color={color}
        cssOverride={overrideCss}
        aria-label="Loading Spinner"
        data-testid="loader" />
      <h2 className={styles.loadText}>Loading...</h2>
    </div>
  )
}

export default Spinner