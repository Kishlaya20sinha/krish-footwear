import { Box, styled } from "@mui/material";
import Slide from "./Slide";

const Component = styled(Box)`
    display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
    width: '83%', // Slightly wider for the products
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

const RightComponent = styled(Box)(({ theme }) => ({
    width: '20%', // Perfect size for the side ad
    marginTop: 80,
    marginLeft: 10,
    padding: 2,
    background: '#edf1e8',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MidSlide = ({ products, title, timer }) => {
    const adURL = 'https://i.ibb.co/SX5NR8hf/shoes-banner-positive-quote-black-background-motivation-to-action-82702217.webp';

    return (
        <Component>
            <LeftComponent>
                <Slide 
                    products={products} 
                    title={title} 
                    timer={timer} 
                />
            </LeftComponent>
            <RightComponent>
                {/* Set width to 100% to fill the RightComponent area */}
                <img src={adURL} alt="ad" style={{ width: '100%', height: 'auto' }} />
            </RightComponent>
        </Component>
    );
};

export default MidSlide;