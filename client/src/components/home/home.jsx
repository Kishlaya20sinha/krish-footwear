import { useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts as listProducts } from '../../redux/actions/productActions';
import NavBar from './NavBar';
import Banner from './Banner';
import Slide from './Slide';
import MidSlide from './MidSlide'; 
import MidSection from './midSection'; // Import name matches file name, but we will use it as MidSection

const Component = styled(Box)`
    padding: 10px;
    background: #F2F2F2;
`;

const Home = () => {
    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts()); 
    }, [dispatch]);

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} title="Deal of the Day" timer={true} />
                
                {/* Fixed: Using the capitalized component name here */}
                <MidSection /> 
                
                <Slide products={products} title="Discounts for you" timer={false} />
                <Slide products={products} title="Suggesting Items" timer={false} />
                <Slide products={products} title="Top Selection" timer={false} />
                <Slide products={products} title="Recommended Items" timer={false} />
                <Slide products={products} title="Trending Items" timer={false} />
                <Slide products={products} title="Season's top picks" timer={false} />
                <Slide products={products} title="Top Deals on Accessories" timer={false} />
            </Component>
        </>
    );
};

export default Home;