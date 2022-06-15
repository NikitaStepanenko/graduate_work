import { Paper, TextField } from "@mui/material";
import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

export const StyledPaper = styled(Paper)`
  max-height: 600px;
  width: 60%;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTextField = styled(TextField)`
  margin: 10px 0;
`;
