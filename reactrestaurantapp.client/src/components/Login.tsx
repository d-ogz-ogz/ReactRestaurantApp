import { useState } from 'react'
import { Button, TextField, Box, Container, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

function Login() {

    const [loggedUser, setLoggedUser] = useState({
        userName: "",
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLoggedUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loggedUser)
    }).then(res => res.json());
}

return (
    <Container>
        <Box sx={{ marginTop: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>

            <Box component="form" onSubmit={handleSubmit} sx={{
                padding: 15
            }}>
                <Typography variant="h4" sx={{ mb: 3, color: blueGrey }}>
                    Welcome
                </Typography>

                <TextField variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="userName"
                    id="userName"
                    label="userName"
                    autoFocus
                    value={loggedUser}
                    onChange={(e) => handleChange(e)}
                >   </TextField>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={loggedUser.password}
                    onChange={(e) => handleChange(e)}
                >
                </TextField>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
                    value={loggedUser.email}
                    onChange={(e) => handleChange(e)}
                >
                </TextField>

                <Button type="submit"

                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}>
                    Login
                </Button>



            </Box>

        </Box>
    </Container>
)
}

export default Login;
