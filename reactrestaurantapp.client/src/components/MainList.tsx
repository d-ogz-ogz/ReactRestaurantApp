import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/system";

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

const StyledContainer = styled(Box)({
    padding: "20px",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
});

const StyledItem = styled(Box)({
    margin:"10px",

});

const hamburgers = [
    { id: 1, name: "Classic Burger", img: "/images/classic-burger.jpg" },
    { id: 2, name: "Cheese Burger", img: "/images/cheese-burger.jpg" },
    { id: 3, name: "Veggie Burger", img: "/images/veggie-burger.jpg" },
    { id: 4, name: "BBQ Burger", img: "/images/bbq-burger.jpg" },
    { id: 5, name: "Chicken Burger", img: "/images/chicken-burger.jpg" },
    { id: 6, name: "Bacon Burger", img: "/images/bacon-burger.jpg" },
    { id: 7, name: "Spicy Burger", img: "/images/spicy-burger.jpg" },
    { id: 8, name: "Mushroom Burger", img: "/images/mushroom-burger.jpg" },
];

function MainList() {

    return (
        <StyledContainer>
            {hamburgers.map((burger) => (
                <StyledItem key={burger.id} sx={{ width: { xs: '100%', sm: '48%', md: '23%' } } }>
                    <StyledCard>
                        <CardActionArea>
                            <StyledMedia
                                image={burger.img}
                                title={burger.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {burger.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </StyledCard>
                </StyledItem>
            ))}
        </StyledContainer>
        );
    };




export default MainList;