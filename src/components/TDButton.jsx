import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const StyledButton = styled(Button)`
  && {
    color: white;
    background: #5aac44;
  }
`;

const TDButton = ({ children, onClick }) => {
  return (
    <StyledButton variant="contained" onMouseDown={onClick}>
      {children}
    </StyledButton>
  );
};

export default TDButton;
