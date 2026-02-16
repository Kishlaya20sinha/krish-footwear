import { Box, Button, styled, Typography } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import { useState } from "react";
import { payUsingPaytm } from "../../service/api";
import { post } from "../utils/paytm";

// Styled Components (Same as before)
const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%', padding: '40px 0 0 40px',
    [theme.breakpoints.down('md')]: { padding: '20px 40px' }
}));
const Image = styled('img')({ padding: '15px', width: '95%', border: '1px solid #f0f0f0' });
const StyledButton = styled(Button)({ width: '48%', height: '50px', borderRadius: '2px', marginTop: '10px', fontWeight: 600 });
const SizeBox = styled(Box)(({ selected }) => ({
    border: `1px solid ${selected ? '#2874f0' : '#f0f0f0'}`,
    background: selected ? '#2874f0' : '#fff',
    color: selected ? '#fff' : '#000',
    padding: '5px 10px', cursor: 'pointer', marginRight: '10px', width: '40px', textAlign: 'center'
}));

const ActionItems = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState(null);

    const addItemToCart = () => {
        if (!selectedSize) { alert('Please select a size first!'); return; }
        dispatch(addToCart(product.id, 1, selectedSize));
        navigate('/cart'); 
    }

    const buyNow = async () => {
        if (!selectedSize) { alert('Please select a size first!'); return; }
        
        // API call karke dynamic params aur checksum mangwa rahe hain.
        let response = await payUsingPaytm({ amount: product.price.cost });
        
        if (response) {
            let information = {
                action: 'https://securegw-stage.paytm.in/order/process', // Paytm Sandbox URL
                params: response 
            }
            // Ye 'post' function browser ko redirect karega Paytm par.
            post(information);
        }
    }

    return (
        <LeftContainer>
            <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0', marginBottom: 10 }}>
                <Image src={product.detailUrl} alt="product" />
            </Box>
            <Typography style={{ marginBottom: 10, fontWeight: 600 }}>Select Size (UK/India):</Typography>
            <Box style={{ display: 'flex', marginBottom: 20 }}>
                {[7, 8, 9, 10, 11].map(size => (
                    <SizeBox key={size} selected={selectedSize === size} onClick={() => setSelectedSize(size)}>{size}</SizeBox>
                ))}
            </Box>
            <Box style={{ display: 'flex', gap: '10px' }}>
                <StyledButton variant="contained" onClick={addItemToCart} style={{ background: '#ff9f00' }}><Cart /> Add to Cart</StyledButton>
                <StyledButton variant="contained" onClick={buyNow} style={{ background: '#fb641b' }}><Flash /> Buy Now</StyledButton>
            </Box>
        </LeftContainer>
    );
}

export default ActionItems;