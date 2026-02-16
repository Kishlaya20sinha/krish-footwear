import React from "react";
import { ButtonGroup, Button, styled } from "@mui/material";

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupedButton = ({ quantity, handleIncrement, handleDecrement }) => {
    return (
        <Component>
            <StyledButton 
                onClick={handleDecrement} 
                disabled={quantity <= 1} // Human language: 1 quantity se kam nahi hone dega.
            >
                -
            </StyledButton>
            <Button disabled>{quantity}</Button>
            <StyledButton 
                onClick={handleIncrement}
            >
                +
            </StyledButton>
        </Component>
    );
}

export default GroupedButton;