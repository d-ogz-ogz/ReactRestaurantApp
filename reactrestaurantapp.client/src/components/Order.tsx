import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Box, Stack } from '@mui/material';

// Ürün modeli
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const Order: React.FC = () => {
    // Sepet bilgilerini state olarak tanımlıyoruz
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: 1, name: 'Hamburger', price: 50, quantity: 2 },
        { id: 2, name: 'Patates Kızartması', price: 20, quantity: 1 },
        { id: 3, name: 'İçecek', price: 15, quantity: 1 },
    ]);

    const totalPrice: number = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleRemove = (id: number): void => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleConfirmOrder = (): void => {
        alert('Siparişiniz Onaylandı!');
    };

    return (
        <Box sx={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Siparişiniz
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                {cartItems.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            width: { xs: '100%', sm: '45%', md: '30%' },
                            marginBottom: '1rem',
                            transition: 'transform 0.3s',
                            '&:hover': { transform: 'scale(1.05)' },
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography color="textSecondary">Adet: {item.quantity}</Typography>
                                <Typography color="textSecondary">Fiyat: {item.price} ₺</Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleRemove(item.id)}
                                    sx={{
                                        marginTop: '10px',
                                        transition: 'background-color 0.3s',
                                        '&:hover': { backgroundColor: '#f50057', color: 'white' },
                                    }}
                                >
                                    Kaldır
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Stack>

            <Typography variant="h5" sx={{ marginTop: '1.5rem' }}>
                Toplam Tutar: {totalPrice} ₺
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmOrder}
                sx={{
                    marginTop: '1rem',
                    padding: '0.75rem 2rem',
                    fontSize: '1.2rem',
                    transition: 'background-color 0.3s, transform 0.3s',
                    '&:hover': { backgroundColor: '#1e88e5', transform: 'scale(1.05)' },
                }}
            >
                Siparişi Onayla
            </Button>
        </Box>
    );
};

export default Order;

