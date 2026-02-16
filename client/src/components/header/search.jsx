import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { InputBase, Box, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
    background: #fff;
    width: 38%;
    min-width: 250px; 
    border-radius: 4px;
    margin-left: 20px;
    display: flex;
    height: 35px;
    align-items: center; 
    position: relative; // Human language: Isse list ko search bar ke respect mein position karne mein madad milegi.
`;

const InputSearchBase = styled(InputBase)`
    padding-left: 15px;
    width: 100%;
    font-size: 14px;
    color: #000;
`;

const SearchIconWrapper = styled(Box)`
    color: #2874f0;
    padding: 5px;
    display: flex;
    cursor: pointer;
`;

// Human language: List ko search bar ke thik neeche lane ke liye margin-top aur z-index fix kiya.
const ListWrapper = styled(List)`
    position: absolute;
    background: #FFFFFF;
    color: #000;
    top: 35px; // Human language: Search bar ki height 35px hai, toh ye thik uske neeche se shuru hoga.
    width: 100%; // Human language: Parent (SearchContainer) ki puri width lega.
    border-top: 1px solid #f0f0f0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000; // Human language: Taaki suggestions banner ya buttons ke upar dikhein.
    max-height: 300px; // Human language: Agar zyada results hain toh scroll aayega.
    overflow-y: auto;
`;

const Search = () => {
    const [ text, setText ] = useState('');
    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const getText = (text) => {
        setText(text);
    }

    return (
        <SearchContainer>
            <InputSearchBase 
                placeholder="Search for Shoe products, brands and more"
                onChange={(e) => getText(e.target.value)}
                value={text}
            />
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            
            {
                text && 
                <ListWrapper>
                    {
                        products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                            <ListItem key={product.id}>
                                <Link 
                                    to={`/product/${product.id}`} 
                                    style={{ textDecoration:'none', color:'inherit', display: 'block', width: '100%'}}
                                    onClick={() => setText('')}
                                >
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
        </SearchContainer>
    );
};

export default Search;