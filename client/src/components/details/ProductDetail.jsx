import { Box, Typography, styled, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { LocalOffer as Badge } from '@mui/icons-material';

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: middle;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`;

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
        border: none; // Table lines ko hide kiya gaya hai.
    }
`;

const ProductDetail = ({ product }) => {
    // Aaj ki date se 5 din aage ki date calculation.
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));

    return (
        <>
            <Typography style={{ fontSize: 18, fontWeight: 600 }}>{product.title.longTitle}</Typography>
            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
                8 Ratings & 1 Review
            </Typography>

            <Typography>
                <Box component="span" style={{ fontSize: 28 }}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ color: '#388E3C' }}>{product.price.discount}</Box>
            </Typography>

            <Typography style={{ fontWeight: 600, marginTop: 20 }}>Available Offers</Typography>
            <SmallText>
                <Typography><StyledBadge />Bank Offer 5% Unlimited Cashback on Aku Dada Credit Card</Typography>
                <Typography><StyledBadge />Bank Offer 10% Off on Priyanka Chachi's Credit Card</Typography>
                <Typography><StyledBadge />Special Price Get extra 10% off (price inclusive of discount)</Typography>
                <Typography><StyledBadge />Get 90% off at Nandan Towers</Typography>
                <Typography><StyledBadge />Get 100% off at Sita Bhawan</Typography>
            </SmallText>

            <Table style={{ marginTop: 20 }}>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40 </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <Box component="span" style={{ color: '#2874f0' }}>SuperComNet</Box>
                            <Typography style={{ fontSize: 14 }}>GST invoice available</Typography>
                        </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </ColumnText>
                </TableBody>
            </Table>
        </>
    )
}

export default ProductDetail;