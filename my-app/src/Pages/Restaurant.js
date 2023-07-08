import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../Contexts/DataProvider";
import { ReviewForm } from "../Components/Review";

export const Restaurant = () => {
  const { restaurantId } = useParams();
  const { state, showReviewForm, setShowReviewForm } = useData();
  const findRestaurant = state.restaurants.find(
    ({ id }) => id === Number(restaurantId)
  );
  const navigate = useNavigate();

  return (
    <>
      <i class="fa-solid fa-arrow-left back" onClick={() => navigate("/")}></i>
      <div className="restaurant-deets">
        <h1>{findRestaurant?.name}</h1>
        <p>
          {findRestaurant?.menu?.map(({ name }) => (
            <span key={name}>{`${name} , `}</span>
          ))}
        </p>
        <p>{findRestaurant?.address}</p>
        <p>Average Rating: {findRestaurant?.averageRating}</p>
        <button
          className="restaurant-btn"
          onClick={() => setShowReviewForm(true)}
        >
          Add Review
        </button>
      </div>
      <hr />
      <div>
        <h1>Reviews</h1>
        {findRestaurant?.ratings?.map(({ rating, comment, revName, pp }) => (
          <div key={revName} className="reviews">
            <div className="review-details">
              <div className="review-profile">
                {pp ? (
                  <img src={pp} alt={revName} />
                ) : (
                  <i class="fa-solid fa-circle-user guest"></i>
                )}
                <h4>{revName}</h4>
              </div>
              <div className="rating">
                {rating}
                <i class="fa-solid fa-star small "></i>
              </div>
            </div>
            <p>{comment}</p>
            <hr />
          </div>
        ))}
      </div>
      {showReviewForm && <ReviewForm restaurantId={restaurantId} />}
    </>
  );
};