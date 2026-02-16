import { styled } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { bannerData } from "../../constants/data";

// Styled image with responsive heights
const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 280,
    background: '#7ba7a7c2',
    // padding: '20px 10px',
    objectFit: 'cover', // Ensures the banner fills the space without distortion
    [theme.breakpoints.down('md')]: {
        height: 180 // Shorter height for mobile devices
    }
}));

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1 // Only 1 item at a time for a hero banner
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Banner = () => {
    return (
        <Carousel 
            responsive={responsive}
            swipeable={false}
            draggable={false}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            slidesToSlide={1}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container"
        >
            {
                bannerData.map((data, index) => (
                    <Image 
                        key={index} 
                        src={data.url} 
                        alt={`banner-${index}`} 
                    />
                ))
            }
        </Carousel>
    );
};

export default Banner;