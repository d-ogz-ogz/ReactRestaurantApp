import { Box, Container, Typography, Link } from '@mui/material';


function Footer() {


    return (
        <Box
            sx={{
                backgroundColor: '#1976d2',  // Footer arka plan rengi (primary mavi)
                color: '#fff',               // Yazý rengi (beyaz)
                padding: '20px 0',           // Üst-alt boþluk
                textAlign: 'center',         // Ortala
                position: 'relative',
                bottom: 0,
                width: '100%',
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="h6">
                    My Awesome Website
                </Typography>
                <Typography variant="body2">
                    {'© '} {new Date().getFullYear()} My Awesome Website. All rights reserved.
                </Typography>
                <Typography variant="body2">
                    <Link href="/privacy" color="inherit">
                        Privacy Policy
                    </Link>
                    {' | '}
                    <Link href="/terms" color="inherit">
                        Terms of Service
                    </Link>
                </Typography>
            </Container>
        </Box>
    )

}

export default Footer;