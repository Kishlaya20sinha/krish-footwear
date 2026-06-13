import { useSelector } from "react-redux";
import { Box, Typography, Grid, styled, Button } from "@mui/material";

import CartItem from './CartItem';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';

import { payUsingPaytm } from "../../service/api";
import { post } from "../utils/paytm";

const Component = styled(Box)(({ theme }) => ({
    marginTop: '55px',
    padding: '30px 135px',
    background: '#f2f2f2',
    minHeight: '90vh',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0',
        marginTop: '50px'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: '15px',
    [theme.breakpoints.down('md')]: {
        marginBottom: '15px',
        paddingRight: 0
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const ButtonWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #c2c385ff;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
    font-weight: 600;
`;

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);

    const buyNow = async () => {
        // Send items to backend so price is calculated server-side
        const items = cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            size: item.size
        }));

        const response = await payUsingPaytm({ items });

        if (response && !response.status) {
            post({
                action: 'https://securegw-stage.paytm.in/order/process',
                params: response
            });
        }
    };

    return (
        <>
            {cartItems && cartItems.length > 0 ? (
                <Component>
                    <Grid container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                                    My Cart ({cartItems.length})
                                </Typography>
                            </Header>
                            {cartItems.map(item => (
                                <CartItem item={item} key={item.cartKey} />
                            ))}
                            <ButtonWrapper>
                                <StyledButton variant="contained" onClick={buyNow}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>

                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalView cartItems={cartItems} />
                        </Grid>
                    </Grid>
                </Component>
            ) : (
                <EmptyCart />
            )}
        </>
    );
};

export default Cart;
