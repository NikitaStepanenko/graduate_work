import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { CardContainer } from "./styles";
import StyledRating from "../StyledRating";

const ReviewCard = ({ rating }) => {
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [day, month, year].join(".");
  };

  return (
    <CardContainer>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Avatar alt="Remy Sharp" src="" />
        <Box display="flex" flexDirection="column" sx={{ ml: "10px" }}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography>{rating.auther.login}</Typography>
            <StyledRating
              sx={{ ml: "5px" }}
              size="small"
              precision={0.25}
              readOnly
              value={rating.rate}
            />
          </Box>
          <Typography variant="secondaryText">
            {formatDate(rating.createdAt)}
          </Typography>
        </Box>
      </Box>
      <Typography mt="10px">{rating.comment}</Typography>
    </CardContainer>
  );
};

export default ReviewCard;
