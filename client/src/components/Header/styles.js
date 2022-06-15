import { Badge } from "@mui/material";
import styled from "styled-components";

export const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    background-color: ${(props) => props.theme.palette.primary.card};
  }
`;
