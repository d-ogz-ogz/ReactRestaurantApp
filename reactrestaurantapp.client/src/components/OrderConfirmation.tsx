
import { Container, Typography, Box, Button } from '@mui/material';

function OrderConfirmation() {
    
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px', textAlign: 'center' }}>
      <Box
        sx={{
          p: 3,
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <Typography variant="h4" gutterBottom style={{ color: '#4CAF50' }}>
          Sipariþiniz Alýndý!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sipariþiniz baþarýyla alýndý ve iþleniyor. Kýsa süre içinde bir onay e-postasý alacaksýnýz.
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6">Sipariþ Numarasý:</Typography>
          <Typography variant="h5" color="primary">
            #123456789
          </Typography>
        </Box>

        <Typography variant="body2" color="textSecondary">
          Teslimat adresiniz ve sipariþ detaylarýnýzý e-postanýzda bulabilirsiniz.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => window.location.href = '/'}
        >
          Ana Sayfaya Dön
        </Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;
