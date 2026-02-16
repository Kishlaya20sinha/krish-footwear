import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, styled, Divider, Button } from '@mui/material';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';


const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    padding: 15px 20px;
    display: flex; 
    align-items: center; // Human language: Keeps title and timer aligned perfectly
`;

const Timer = styled(Box)`
    display: flex;
    margin-left: 10px;
    align-items: center;
    color: #7f7f7f;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    margin-right: 25px;
    line-height: 32px;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto; 
    background-color: #2874f0; 
    border-radius: 2px;
    font-size: 13px;
    font-weight: 600;
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
});

const Slide = ({ products, title, timer }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        // This formats the time display
        return <Box variant="span">{hours} : {minutes} : {seconds} Left</Box>;
    };

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {
                    /* STRICT LOGIC: Timer shows ONLY if 'timer' prop is true AND title is exactly 'Deal of the Day' */
                    timer && title === 'Deal of the Day' && (
                        <Timer>
                            <img src={timerURL} alt="timer" style={{ width: 24, marginRight: 10 }} />
                            <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Timer>
                    )
                }
                <ViewAllButton variant="contained" color="primary">View All</ViewAllButton>
            </Deal>
            <Divider />
            {
                products && products.length > 0 ? (
                    <Carousel 
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        centerMode={true}
                        containerClass="carousel-container"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {
                            products.map((product) => (
                                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}> 
                                <Box textAlign="center" style={{ padding: '25px 15px' }} key={product.id || product._id}>
                                    <Image src={product.url} alt="product" />
                                    <Typography style={{ fontWeight: 600, color: '#212121' }}>
                                        {product.title?.shortTitle}
                                    </Typography>
                                    <Typography style={{ color: 'green' }}>{product.discount}</Typography>
                                    <Typography style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Typography>
                                </Box>
                                </Link>
                            ))
                        }
                    </Carousel>
                ) : (
                    <Box style={{ padding: '40px', textAlign: 'center' }}>
                        <Typography color="textSecondary">Loading products...</Typography>
                    </Box>
                )
            }
        </Component>
    );
};

export default Slide;