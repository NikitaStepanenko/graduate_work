import {
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Image, StyledCard } from "./styles";
import food from "../../assets/food.png";
import StyledRating from "../StyledRating";
import ButtonCounterer from "../ButtonCounterer";
import { useNavigate } from "react-router-dom";
import { getRating } from "../../helpers/getRating";

const ProductCard = ({ product, user }) => {
  const navigate = useNavigate();

  return (
    <StyledCard
      elevation={3}
      sx={{ bgcolor: "primary.card" }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <CardMedia
        sx={{ bgcolor: "white", objectFit: "contain" }}
        component="img"
        height="220"
        image={`${process.env.REACT_APP_BASE_API_URL}/${product.image}`}
        alt="green iguana"
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Typography gutterBottom component="div" variant="ellipsis">
            {product.name}
          </Typography>
          <Box>
            <StyledRating
              name="size-small"
              defaultValue={getRating(product)}
              size="small"
              precision={0.25}
              readOnly
            />
            <Typography sx={{ mt: "5px" }} variant="h5">
              {product.price} ₽
            </Typography>
          </Box>
        </Box>
      </CardContent>
      {user && (
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <ButtonCounterer isoncard={true} productId={product.id} />
        </CardActions>
      )}
    </StyledCard>
  );
};

export default ProductCard;
