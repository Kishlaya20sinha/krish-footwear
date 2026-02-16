import { Menu, Typography, styled, Box, MenuItem } from "@mui/material";
import { useState } from "react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Component = styled(Box)`
    margin-top: 2px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
    color: #000;
    font-weight: 600;
    cursor: pointer;
`;

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false); // Tracks if the menu is open or closed

    const handleClick = (event) => {
        setOpen(event.currentTarget); // Opens the menu exactly where you clicked
    }

    const handleClose = () => {
        setOpen(false); // Closes the menu
    }

    const logoutUser = () => {
        setAccount(''); // Clears the user's name from the global state
        setOpen(false); // Ensures the menu closes after clicking logout
    }

    return (
        <>
            <Box onClick={handleClick} style={{ cursor: 'pointer' }}>
                <Typography style={{ marginTop: 2 }}>
                    {account}
                </Typography>
            </Box>
            <Menu
                anchorEl={open}
                open={Boolean(open)} // Converts the anchor element to a true/false value
                onClose={handleClose}
                style={{ marginTop: '5px' }}
            >
                {/* FIXED: Removed the <LogoutUser> tags and used onClick properly */}
                <MenuItem onClick={() => { handleClose(); logoutUser(); }}>
                    <PowerSettingsNewIcon color="primary" fontSize="small" />
                    <Logout>Logout</Logout> 
                </MenuItem>
            </Menu>
        </>
    );
};

export default Profile;