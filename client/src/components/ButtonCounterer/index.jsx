import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  StyledButton,
  StyledButtonContainer,
  StyledButtonGroup,
} from "./styles";
import { addToBasket, removeFromBasket } from "../../api/productApi";
import { useDispatch } from "react-redux";
import {
  decrementBasket,
  getBasket,
  incrementBasket,
} from "../../redux/reducers/ProductSlice";

const ButtonCounterer = ({
  isoncard,
  price,
  initialNum,
  cart,
  productId,
  setFullPrice,
}) => {
  const [number, setNumber] = useState(initialNum || 0);
  const dispatch = useDispatch();
  const add = (e) => {
    e.stopPropagation();
    setNumber((prev) => prev + 1);
    if (cart) setFullPrice((number + 1) * price);
    addToBasket(productId);
    dispatch(incrementBasket({ price }));
  };

  const remove = (e) => {
    e.stopPropagation();
    if (number > 1) {
      setNumber((prev) => prev - 1);
      if (cart) setFullPrice((number - 1) * price);

      dispatch(decrementBasket({ price }));
      if (isoncard) {
        removeFromBasket(productId);
      }
    } else {
      if (isoncard) {
        removeFromBasket(productId);
        dispatch(getBasket());
      }
    }
  };
  return (
    <Box
      sx={{
        display: cart && "flex",
        flexDirection: cart && "column",
        alignItems: cart && "center",
      }}
    >
      <StyledButtonContainer isoncard={isoncard}>
        <StyledButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <StyledButton onClick={remove} isoncard={isoncard}>
            <RemoveIcon />
          </StyledButton>
          {/* {!isoncard && (
            <StyledButton isoncard={isoncard}>{number}</StyledButton>
          )} */}
          <StyledButton isoncard={isoncard} onClick={add}>
            <AddIcon />
          </StyledButton>
        </StyledButtonGroup>
      </StyledButtonContainer>
      {cart && number > 1 && (
        <Typography mt={"5px"}>
          {price} ₽ x {number} шт
        </Typography>
      )}
    </Box>
  );
};

export default ButtonCounterer;
