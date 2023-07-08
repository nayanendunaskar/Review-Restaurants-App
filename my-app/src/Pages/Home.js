import { useState } from "react";
import { restroData } from "../Database/restroData";
import { useData } from "../Contexts/DataProvider";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [showRestaurants, setShowRestaurants] = useState(false);
  const { state, dispatch } = useData();
  const navigate = useNavigate();
  return (
    <>
      <h1>Food Ordering App</h1>
      <h3>Select Your Cuisine</h3>
      {restroData.map((cuisine) => (
        <button
          key={cuisine.id}
          onClick={() => {
            setShowRestaurants(true);
            dispatch({ type: "SET_RESTAURANT", payload: cuisine });
          }}
        >
          {cuisine.name}
        </button>
      ))}
      {showRestaurants && (
        <div
          className="entire-restaurant"
          onClick={() =>
            navigate(`/restaurants/${state?.currentRestaurant?.id}`)
          }
        >
          <h1>Dishes By {state?.currentRestaurant?.name}</h1>
          <div className="restaurantList">
            {state?.currentRestaurant?.menu?.map(
              ({ name, imgSrc, price, qty }) => (
                <div key={name}>
                  <img src={imgSrc} alt={name} />
                  <h3>{name}</h3>
                  <p>
                    Rs {price} for {qty}
                  </p>
                  <p>{state?.currentRestaurant?.name}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};