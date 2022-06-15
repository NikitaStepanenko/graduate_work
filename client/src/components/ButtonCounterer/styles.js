import { Button, ButtonGroup } from "@mui/material";
import styled from "styled-components";

export const StyledButtonGroup = styled(ButtonGroup)`
  margin-top: 5px;
`;

export const StyledButton = styled(Button)`
  width: ${(props) => props.isoncard && "32px"};
  height: ${(props) => props.isoncard && "32px"};
  padding: ${(props) => props.isoncard && "8px"};
  svg {
    font-size: ${(props) => props.isoncard && "16px"};
  }
`;

export const StyledButtonContainer = styled.div`
  ${(props) =>
    !props.isoncard &&
    `    margin-left: auto;
    float: right;
  display: flex;
`}
`;
