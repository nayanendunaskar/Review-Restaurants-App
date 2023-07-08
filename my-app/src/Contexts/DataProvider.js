import { createContext, useContext, useReducer, useState } from "react";
import { restaurantsData } from "../Database/restroData";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_RESTAURANT":
        return {
          ...state,
          currentRestaurant: restaurantsData.find(
            (restaurant) => restaurant.id === action.payload.id
          ),
        };
      case "SET_COMMENT":
        return {
          ...state,
          review: {
            ...state.review,
            comment: action.payload,
          },
        };
      case "SET_RATING":
        return {
          ...state,
          review: {
            ...state.review,
            rating: action.payload,
          },
        };
      case "SUBMIT_REVIEW":
        return {
          ...state,
          restaurants: state.restaurants.map((restaurant) =>
            restaurant.id === action.payload
              ? {
                  ...restaurant,
                  ratings: [...restaurant.ratings, state.review],
                }
              : restaurant
          ),
          review: {
            revName: "Guest",
            rating: "",
            comment: "",
          },
        };
      case "CLEAR_REVIEW":
        return {
          ...state,
          review: {
            revName: "Guest",
            rating: "",
            comment: "",
          },
        };
      default:
        return state;
    }
  };

  const initialState = {
    restaurants: restaurantsData,
    currentRestaurant: {},
    review: {
      revName: "Guest",
      rating: "",
      comment: "",
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showReviewForm, setShowReviewForm] = useState(false);
  console.log(state, "state");
  return (
    <DataContext.Provider
      value={{ state, dispatch, showReviewForm, setShowReviewForm }}
    >
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);