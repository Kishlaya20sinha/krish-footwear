import { useState, useContext } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoginDialog from "../login/LoginDialog";
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";

// Container ko mobile view mein column direction di gayi hai.
const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto', 
    '& > *': {
        marginRight: '40px !important', // Desktop par spacing.
        textDecoration: 'none',
        color: '#000',
        fontWeight: 600,
        cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column', // Mobile drawer mein items vertical dikhenge.
        alignItems: 'flex-start', // Items ko left align karne ke liye.
        margin: '20px 0 0 20px',  // Drawer ke andar thoda gap.
        '& > *': {
            marginRight: '0 !important',
            marginBottom: '20px' // Har item ke beech vertical gap.
        }
    }
}));

const Wrapper = styled(Link)`
    display: flex;
    align-items: center;
    & > p {
        margin-left: 8px;
    }
`;

const LoginButton = styled(Button)`
    background-color: #fff; 
    color: #2874f0; 
    text-transform: none;
    font-weight: 600;
    border-radius: 2px;
    padding: 5px 40px;
    box-shadow: none;
    height: 32px;
`;

const CustomButtons = () => {
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(DataContext);

    return (
        <Container>
            {
                account ? <Profile account={account} setAccount={setAccount}/> :
                    <LoginButton variant="contained" onClick={() => setOpen(true)}>Login</LoginButton>
            }

            <Typography style={{ fontSize: 14 }}>Become a Seller</Typography>
            <Typography style={{ fontSize: 14 }}>More</Typography>

            <Wrapper to='/cart'>
            
                <AddShoppingCartIcon />
                <Typography style={{ fontSize: 14 }}>Cart</Typography>
            </Wrapper>

            <LoginDialog open={open} setOpen={setOpen} />
        </Container>
    );
};

export default CustomButtons;