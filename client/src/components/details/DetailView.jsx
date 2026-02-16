import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productActions';
import { Box, Grid, styled } from '@mui/material'; 
import ActionItems from './ActionItems';
import ProductDetail from './ProductDetail';

const Component = styled(Box)`
    background: #F2F2F2;
    margin-top: 55px;
`;

// Container ko flex display diya aur width 100% rakhi taaki side-by-side aayein.
const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex', 
    flexDirection: 'row', // Force kar rahe hain ki items line mein rahein.
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column' // Sirf mobile par ek ke neeche ek aayega.
    }
}));

const RightContainer = styled(Grid)`
    margin-top: 50px;
    padding-left: 20px;
    // Detail section ko poori bachi hui width dene ke liye
    flex: 1; 
`;

const DetailView = () => {
    const dispatch = useDispatch(); 
    const { id } = useParams();
    const { loading, product } = useSelector(state => state.getProductDetails);

    useEffect(() => {
        if (product && id !== product.id) {
            dispatch(getProductDetails(id));
        } else if (!product) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id, product]);

    return (
        <Component>
            {
                product && Object.keys(product).length > 0 && 
                <Container container>
                    {/* Left side for Image (40% width approx) */}
                    <Grid item lg={4} md={5} sm={12} xs={12}>
                        <ActionItems product={product} />
                    </Grid>
                    
                    {/* Right side for Details (60% width approx) */}
                    <RightContainer item lg={8} md={7} sm={12} xs={12}>
                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            }
        </Component>
    )
}

export default DetailView;