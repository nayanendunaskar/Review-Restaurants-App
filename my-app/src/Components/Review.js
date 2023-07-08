import { useData } from "../Contexts/DataProvider";

export const ReviewForm = ({ restaurantId }) => {
  const { setShowReviewForm, dispatch } = useData();

  return (
    <>
      <div className="overlay">
        <div className="pop-up">
          <i
            class="fa-solid fa-circle-xmark"
            onClick={() => {
              setShowReviewForm(false);
              dispatch({ type: "CLEAR_REVIEW" });
            }}
          ></i>
          <h1>Add Your Review</h1>
          <label>
            Rating:
            <select
              onChange={(event) =>
                dispatch({ type: "SET_RATING", payload: event.target.value })
              }
            >
              <option>Select Rating</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating}>{rating}</option>
              ))}
            </select>
          </label>
          <label>
            {" "}
            Comment:
            <input
              onChange={(event) =>
                dispatch({ type: "SET_COMMENT", payload: event.target.value })
              }
            />
          </label>
          <button
            onClick={() => {
              dispatch({
                type: "SUBMIT_REVIEW",
                payload: Number(restaurantId),
              });
              setShowReviewForm(false);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};