import { Grid, styled } from "@mui/material";
// data.js se imageURL (top 3 banners) ko import kar rahe hain.
import { imageURL } from "../../constants/data"; 

const Wrapper = styled(Grid)`
    margin-top: 10px;
    display: flex; 
    justify-content: space-between; 
`;

const Image = styled('img')(({ theme }) => ({ 
    marginTop: 10,
    width: '100%', 
    display: 'block', 
    // Banner ki height set kar rahe hain taaki stretch na ho.
    height: 280, 
    objectFit: 'cover', 
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 120
    }
}));

const MidSection = () => {
    // Ye long horizontal shoe banner ka link hai.
    const url = 'https://i.ibb.co/6jcWynG/female-hands-different-stylish-shoes-260nw-2445641531.webp';

    return (
        <>
            <Wrapper container lg={12} sm={12} md={12} xs={12} spacing={1}>
                {
                    imageURL.map((image, index) => (
                        <Grid item lg={4} md={4} sm={12} xs={12} key={index}>
                            <Image src={image} alt={`banner-${index}`} />
                        </Grid>
                    ))
                }
            </Wrapper>
            {/* Bottom banner yahan load hoga. URL ko quotes mein rakha hai. */}
            <Image 
                src={url} 
                alt="bottom-banner" 
                style={{ width: '100%', marginTop: 20, height: 'auto', minHeight: 150 }} 
            />
        </>
    )
}

export default MidSection;