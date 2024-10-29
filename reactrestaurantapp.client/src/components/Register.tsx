import React, { useState } from 'react'
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        consent: true,
        subscribe: true
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch("controllerName/method", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(res => res.json()) //then(setFormData({})
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData, [name]: type === 'checkbox' ? checked : value
        })

    }
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}

                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="username"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                        />
                    }
                    label="I give my consent to the data usage."
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="subscribe"
                            checked={formData.subscribe}
                            onChange={handleChange}
                        />
                    }
                    label="I want to receive information about campaigns."
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                ></Button>

            </form>

        </Box>
    )
}

export default Register

