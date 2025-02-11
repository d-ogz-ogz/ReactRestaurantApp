
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
          Sipari�iniz Al�nd�!
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sipari�iniz ba�ar�yla al�nd� ve i�leniyor. K�sa s�re i�inde bir onay e-postas� alacaks�n�z.
        </Typography>

        <Box sx={{ my: 3 }}>
          <Typography variant="h6">Sipari� Numaras�:</Typography>
          <Typography variant="h5" color="primary">
            #123456789
          </Typography>
        </Box>

        <Typography variant="body2" color="textSecondary">
          Teslimat adresiniz ve sipari� detaylar�n�z� e-postan�zda bulabilirsiniz.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => window.location.href = '/'}
        >
          Ana Sayfaya D�n
        </Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;
