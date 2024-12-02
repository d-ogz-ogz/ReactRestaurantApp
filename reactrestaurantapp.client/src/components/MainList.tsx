import React, { useState } from "react";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ProductDetail from "./ProductDetail";
import { ProductModel } from "../models/ProductModel";
import { useCart } from "../contexts/UseCart";

interface ProductCardProps {
    product: ProductModel;
}

const StyledCard = styled(Card)({
    maxWidth: 300,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
});

const StyledMedia = styled(CardMedia)({
    height: 200,
});

const StyledItem = styled(Box)({
    margin: "10px",
});

const MainList: React.FC<ProductCardProps> = ({ product }) => {
    const { handleAddProduct } = useCart();
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <StyledItem
            key={product.id}
            sx={{ width: { xs: "100%", sm: "48%", md: "23%" } }}
        >
    
            <StyledCard onClick={handleOpen}>
                <CardActionArea>
                    <StyledMedia image={product.img} title={product.name} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </StyledCard>

  
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <ProductDetail product={product} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleAddProduct(product);
                            handleClose();
                        }}
                    >
                        Add To Cart
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledItem>
    );
};

export default MainList;
