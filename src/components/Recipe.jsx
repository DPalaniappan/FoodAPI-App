import { useEffect, useState } from "react";
import styles from "./recipe.module.css";
import ItemList from "./ItemList";
export default function Recipe({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_Key = "7603e4736eaa4555b214240bbf51fdec";
  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`${URL}?apiKey=${API_Key}`);
      const data = await res.json();
      console.log(data);
      setFood(data);
      setIsLoading(false);
    }
    if (foodId) {
      fetchFood();
    }
  }, [foodId]);
  if (foodId) {
    return (
      <div>
        <div className={styles.recipeCard}>
          <h1 className={styles.recipeName}>{food.title}</h1>
          <img className={styles.recipeImage} src={food.image} alt="" />
          <div className={styles.recipeDetails}>
            <span>
              ⏲ <strong>{food.readyInMinutes} Minutes</strong>
            </span>
            <span>
              🧍‍♂️<strong>Serves {food.servings}</strong>
            </span>
            <span>
              <strong>
                {food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}
              </strong>
            </span>
            <strong>
              <span>{food.vegan ? " 🐮 Vegan" : ""}</span>
            </strong>
          </div>
          <div>
            ＄ <span>{food.pricePerServing / 100} Per Serving</span>
          </div>
          <h2>Ingrediants</h2>
          <ItemList food={food} isLoading={isLoading} />
          <h2>Instructions</h2>
          <div className={styles.recipeInstructions}>
            <ol>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                food.analyzedInstructions[0].steps.map((step) => (
                  <li>{step.step}</li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="">
          <h1>Click on the View Recipe to get Recipe</h1>
        </div>
      </div>
    );
  }
}
