import { Rating } from "@mui/material";
import styled from "styled-components";

export const ColoredRating = styled(Rating)`
  color: ${(props) => props.theme.palette.primary.main};
  .MuiRating-icon {
  }
`;
