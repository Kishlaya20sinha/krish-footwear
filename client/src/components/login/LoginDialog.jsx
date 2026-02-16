import { useState, useContext } from "react";
import { Dialog, Box, styled, Typography, Button, TextField } from "@mui/material";
import { authenticateSignup, authenticateLogin } from "../../service/api"; 
import { DataContext } from "../../context/DataProvider";

// --- Styled Components ---

const Component = styled(Box)`
    height: 70vh; 
    width: 90vh;  
`;

const Image = styled(Box)`
    background: #a4aff6ff url(https://i.ibb.co/qYZtbwTB/photograph-krish-footwear-login.jpg) center center no-repeat;
    background-size: contain; 
    height: 100%; 
    width: 28%;  
    padding: 45px 35px; 
    & > p, & > h5 {
        color: #0d0d0dff; 
        font-weight: 600; 
    }
`;

const Wrapper = styled(Box)`
    display: flex; 
    flex-direction: column; 
    padding: 25px 35px; 
    flex: 1; 
    & > div, & > button, & > p {
        margin-top: 20px; 
    }
`;

const LoginButton = styled(Button)`
    text-transform: none; 
    background: #7fba1eff; 
    color: #501111ff;
    height: 48px;
    border-radius: 2px; 
`;

const RequestOtp = styled(Button)`
    text-transform: none; 
    background: #18669bff;
    color: #fff; 
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%); 
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const Text = styled(Typography)`
    font-size: 12px; 
    color: #878787; 
`;

const CreateAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #2874f0; 
    font-weight: 600;
    cursor: pointer; 
`;

// --- Initial Constants ---

const accountInitialValues = {
    login: { view: 'login', heading: 'Login', subHeading: 'Get access to your Orders, Wishlist and Recommendations' },
    signup: { view: 'signup', heading: "Looks like you're new here", subHeading: 'Sign up with your mobile number to get started' }
};

const signupInitialValues = {
    firstname: '', lastname: '', username: '', email: '', password: '', phone: ''
};

const loginInitialValues = {
    username: '',
    password: ''
};

// --- Main Component ---

const LoginDialog = ({ open, setOpen }) => {
    const [account, toggleAccount] = useState(accountInitialValues.login); 
    const [signup, setSignup] = useState(signupInitialValues); 
    const [login, setLogin] = useState(loginInitialValues); 
    const [error, setError] = useState(false); // This state handles the logic for showing/hiding the error message

    const { setAccount } = useContext(DataContext); 

    const handleClose = () => {
        setOpen(false); // Close the popup
        toggleAccount(accountInitialValues.login); // Reset view to login for next time
        setError(false); // Hide error message on close
    }

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup); // Switch to the signup screen
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value }); // Update signup data state
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value }); // Update login data state
    }

    const signupUser = async () => {
        let response = await authenticateSignup(signup); // API call to create user
        if (response && response.status === 200) {
            handleClose(); 
            setAccount(signup.firstname); // Update name in header globally
        } else {
            console.log("Signup failed");
        }
    }

    const loginUser = async () => {
        let response = await authenticateLogin(login); // API call to verify user
        if (response && response.status === 200) {
            handleClose(); 
            setAccount(response.data.data.firstname); // Set first name from database response
        } else {
            setError(true); // Trigger the "Error" styled component visibility
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                    </Image>

                    {
                        account.view === 'login' ?
                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onValueChange(e)} name='username' label="Enter Username" />
                                { error && <Error>Please enter valid Username or Password</Error> }
                                <TextField variant="standard" onChange={(e) => onValueChange(e)} name='password' label="Enter Password" type="password" />

                                <Text>By continuing, you agree to <span style={{ color: '#2874f0' }}> Krish Footwear's Terms & Conditions</span></Text>

                                <LoginButton onClick={() => loginUser()}>Login</LoginButton>

                                <Typography style={{ textAlign: 'center', color: '#878787' }}>OR</Typography>
                                <RequestOtp>Request OTP</RequestOtp>
                                <CreateAccount onClick={() => toggleSignup()}>New to Krish Footwear? Create an account</CreateAccount>
                            </Wrapper>
                            :
                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label="Enter Firstname" />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label="Enter Lastname" />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label="Enter Username" />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label="Enter Email" />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Enter Password" />
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label="Enter Mobile Number" />

                                <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    );
};

export default LoginDialog;