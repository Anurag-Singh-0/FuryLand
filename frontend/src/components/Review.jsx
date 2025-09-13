import Rating from "@mui/material/Rating";

function Review({value, ratingNum}) {
  return (
    <div className="flex items-center gap-3 mt-3">
      <Rating name="read-only" value={value} readOnly />
      <span className="text-sm font-medium">( {ratingNum} )</span>
    </div>
  );
}

export default Review;
