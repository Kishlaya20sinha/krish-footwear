import { Box, Typography, styled, Button } from '@mui/material';
import GroupedButton from './GroupButton';
import { removeFromCart, addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background: #fff;
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
    color: #000;
    font-weight: 600;
`;

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    // Plus (+) button click hone par quantity 1 badhayenge.
    const handleIncrement = () => {
        dispatch(addToCart(item.id, item.quantity + 1, item.size));
    };

    // Minus (-) button click hone par quantity 1 kam karenge (min 1 tak).
    const handleDecrement = () => {
        if (item.quantity > 1) {
            dispatch(addToCart(item.id, item.quantity - 1, item.size));
        }
    };

    return (
        <Component>
            <LeftComponent>
                <img src={item.detailUrl} alt="product" style={{ height: 110, width: 110 }} />
                <GroupedButton 
                    quantity={item.quantity} 
                    handleIncrement={handleIncrement} 
                    handleDecrement={handleDecrement} 
                />
            </LeftComponent>
            <Box style={{ margin: '20px' }}>
                <Typography>{item.title.longTitle}</Typography>
                <SmallText>Seller: Krish Footwear</SmallText>
                <Typography style={{ margin: '20px 0' }}>
                    {/* Individual item cost * quantity. */}
                    <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
                        ₹{item.price.cost * item.quantity}
                    </Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: '#878787' }}>
                        <strike>₹{item.price.mrp * item.quantity}</strike>
                    </Box>&nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: '#388E3C' }}>
                        {item.price.discount} Off
                    </Box>
                </Typography>
                <Typography style={{ fontSize: 14, fontWeight: 600 }}>Size: {item.size}</Typography> 
                <Remove onClick={() => removeItemFromCart(item.id)}>REMOVE</Remove>
            </Box>
        </Component>
    );
};

export default CartItem;