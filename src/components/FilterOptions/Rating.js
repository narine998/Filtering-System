import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { getLabelText } from "../.././utils/helper";
import { RATING_LABELS } from "../.././utils/constants";

export default function HoverRating({ value, handleFilterChange }) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
      <Rating
        name="hover-feedback"
        size="large"
        value={value}
        precision={0.1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          handleFilterChange("rating", newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{RATING_LABELS[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
