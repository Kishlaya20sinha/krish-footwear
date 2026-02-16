import { Typography, Box, styled } from '@mui/material'; 
import { navData } from '../../constants/data';

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 130px !important', 
    overflowX: 'auto', 
    background: '#fff',
    [theme.breakpoints.down('lg')]: {
        margin: '0px !important'
    }
}));

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center;
    display: flex;       /* Ensures vertical centering */
    flex-direction: column;
    align-items: center;
`;

// New styled component for images to ensure uniformity
const Image = styled('img')({
    width: 64,
    height: 64,          /* Fixed height to keep them in line */
    objectFit: 'contain', /* Prevents stretching; keeps aspect ratio */
    marginBottom: 8
});

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;

const NavBar = () => {
    return (
        <Box style={{ background: '#fff' }}>
            <Component>
                {
                    navData.map((data, index) => (
                        <Container key={index}>
                            <Image src={data.url} alt={data.text} />
                            <Text>{data.text}</Text>
                        </Container>
                    ))
                }
            </Component>
        </Box>
    );
}

export default NavBar;