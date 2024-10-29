import { Card, CardContent, CardMedia, Box, Typography, Button } from '@mui/material';
import {useEffect,useState} from 'react';

function Menu() {
    type MenuItem = {
        id: number,
        title: string,
        description: string,
        image: string
    };
    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        fetch("contollerName/method").then(res => res.json()).then(data => setMenu(data)).catch((err)=> console.log(err))
    },[])



    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: 2,
            }}
        >


            {menu.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        width: 'calc(25% - 16px)',
                        minWidth: 250, 
                        marginBottom: 2, 
                    }}
                >
                    <Card>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.image}
                            alt={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                Order Now
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
};

export default Menu;

