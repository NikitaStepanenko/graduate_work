import { Box } from "@mui/material";
import styled from "styled-components";

export const CardContainer = styled(Box)`
  padding: 20px 0;
  /* border-top: 1px solid ${(props) => props.theme.palette.primary.contrast};
  &:last-child {
    border-bottom: 1px solid ${(props) => props.theme.palette.primary.contrast};
  } */
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 150px;
  object-fit: contain;
  border-radius: 4px 4px 0 0;
`;
