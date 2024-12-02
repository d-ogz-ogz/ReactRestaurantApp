import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    styled,
    Typography,
} from "@mui/material";
import { useCart } from "../contexts/UseCart";
import React from "react";
import { ProductModel } from "../models/ProductModel";

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

const ProductDetail: React.FC<ProductCardProps> = ({ product }) => {
    const { handleAddProduct } = useCart();
    const navigate = useNavigate(); // Yönlendirme için hook

    const handleAddToCartAndNavigate = () => {
        handleAddProduct(product); // Ürünü sepete ekle
        navigate("/cart"); // Cart bileþenine yönlendir
    };

    return (
        <StyledCard>
            <CardActionArea>
                <StyledMedia image={product.img} title={product.name} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                </CardContent>
                <Button onClick={handleAddToCartAndNavigate}>
                    Add To Cart
                </Button>
            </CardActionArea>
        </StyledCard>
    );
};

export default ProductDetail;
