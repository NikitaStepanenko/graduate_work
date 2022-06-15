import { Paper } from "@mui/material";
import styled from "styled-components";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.card,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

export const Image = styled.img`
  width: 100%;
  height: 260px;
  object-fit: contain;
  border-radius: 4px 4px 0 0;
`;
