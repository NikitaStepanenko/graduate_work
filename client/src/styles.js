import { Container } from "@mui/material";
import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  * {
    box-sizing: border-box;
  }
  background-color: ${(props) => props.theme.palette.primary.theme};
`;

export const StyledPageContainer = styled(Container)`
  margin-bottom: 0;
  padding-bottom: 20px;
`;
