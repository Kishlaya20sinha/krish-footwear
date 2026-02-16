import { useState } from 'react'; 
import { AppBar, Toolbar, Typography, Box, styled, IconButton, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { Menu as MenuIcon } from '@mui/icons-material'; 

// components
import Search from './search';
import CustomButtons from './CustomButtons';

const StyledHeader = styled(AppBar)`
    background: #c2c385ff;
    height: 70px; 
    justify-content: center;
    box-shadow: none;
`;

const CenteredBundle = styled(Link)`
    display: flex;
    flex-direction: column; 
    align-items: center;
    margin-left: 12px;
    cursor: pointer;
    text-decoration: none; 
    color: inherit;        
`;

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('md')]: {
        display: 'none' // Laptop par dikhega, mobile par hide ho jayega.
    }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    color: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'block' // Sirf mobile screen par hamburger icon dikhega.
    }
}));

// Styled component ka naam 'ResponsiveDrawer' rakha taaki MUI ke Drawer se conflict na ho.
const ResponsiveDrawer = styled(Drawer)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'none' // Agar screen badi ho jaye toh drawer apne aap band/hide ho jaye.
    }
}));

const SubHeading = styled(Typography)`
    font-size: 12px;
    font-weight: 600;
    font-style: italic;
    color: #000;
    line-height: 1;
    margin-top: 2px;
`;

const Header = () => {
    const logoURL = "https://i.ibb.co/XB6y7sh/logo.png";
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Iska naam 'renderList' rakha hai taaki MUI ke <List> tag ke saath confusion na ho.
    const renderList = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <ListItem disablePadding>
                    <Box style={{ width: '100%' }}>
                        <CustomButtons />
                    </Box>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <StyledHeader position="static">
            <Toolbar style={{ display: 'flex', alignItems: 'center' }}>
                
                <MenuButton onClick={handleOpen}>
                    <MenuIcon />
                </MenuButton>

                <ResponsiveDrawer open={open} onClose={handleClose}>
                    {renderList()}
                </ResponsiveDrawer>

                <CenteredBundle to="/">
                    <img 
                        src={logoURL} 
                        alt="Krish Footwear Logo" 
                        style={{ height: 40, width: 40 }} 
                    />
                    <Box>
                        <SubHeading>
                            Krish&nbsp;
                            <Box component="span" style={{ color: "rgba(206, 17, 17, 1)" }}>
                                Footwear
                            </Box>
                        </SubHeading>
                    </Box>
                </CenteredBundle>
                
                <Search /> 

                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>

            </Toolbar>
        </StyledHeader>
    );
};

export default Header;