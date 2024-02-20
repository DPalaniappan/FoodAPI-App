import { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_Key = "7603e4736eaa4555b214240bbf51fdec";
export default function Search({ setFoodData }) {
  const [query, setQuery] = useState("pizza");
  //syntax of use effect hook
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?query=${query}&apiKey=${API_Key}`);
      const data = await res.json();
      setFoodData(data.results);
    }
    fetchFood();
  }, [query]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        value={query}
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
