import { Card, Paper } from "@mui/material";
import styled from "styled-components";

export const StyledCard = styled(Card)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.card,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  color: theme.palette.text.primary,
  cursor: "pointer",
  "&:hover": {
    boxShadow: theme.palette.cardShadow,
  },
}));

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 4px 4px 0 0;
`;

{
  /* <StyledPaper
elevation={3}
sx={{ bgcolor: "primary.card" }}
onClick={() => navigate(`/product/${product.id}`)}
>
<Image src={`${process.env.REACT_APP_BASE_API_URL}/${product.image}`} />
<StyledRating
  name="size-small"
  defaultValue={product.rating}
  size="small"
  precision={0.25}
  readOnly
/>
<Typography variant="ellipsis">{product.name}</Typography>
<Typography sx={{ mt: "5px" }}>{product.price} ₽</Typography>
<ButtonCounterer isoncard={true} productId={product.id} />
</StyledPaper> */
}
