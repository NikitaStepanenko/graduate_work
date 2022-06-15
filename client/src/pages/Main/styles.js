import { Container, Typography } from "@mui/material";
import styled from "styled-components";
import { StyledPageContainer } from "../../styles";

export const CurvedBackground = styled.div`
  display: block;
  box-sizing: border-box;
  height: 500px;
  background-color: ${(props) => props.theme.palette.primary.main};
  clip-path: ellipse(90% 100% at 64.4% 0%);
`;

export const CurvedContainer = styled(StyledPageContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Title = styled(Typography)`
  margin: 50px 0;
`;
