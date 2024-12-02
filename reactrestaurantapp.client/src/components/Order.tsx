import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { useDispatch } from "react-redux";
import { SubmitOrder } from "../actions/OrderActions";
import { OrderModel } from "../models/OrderModel";

import { useCart } from "../contexts/UseCart";
import { MenuItemModel } from "../models/MenuItemModel";
import { CityModel } from "../models/CityModel";
import { DistrictModel } from "../models/DistrictModel";



const OrderPage: React.FC = () => {
    const { cart } = useCart();
    const [ cities, setCities ] = useState<CityModel[]>([]);
    const [districts, setDistricts ] = useState<DistrictModel[]>([]);
    const [order, setOrder] = useState<OrderModel>({
        id: 0,
        shippingAddress: "",
        receiverName: "",
        products: [],
        contactNumber: "",
        grandTotal: 0,
        city: "",
        sameAddress: true,
        district: "",
        billingAddress: "",
    });
    const getDistricts = (cityId:number) => {
        fetch(`/User/GetDistricts?=${cityId}`).then(res => res.json()).then(data => setDistricts(data)).catch(err=> console.log(err))
    }
     const getCities = () => {
        fetch(`/User/Cities`).then(res => res.json()).then(data => setCities(data)).catch(err => console.log(err))
    }

    const dispatch = useDispatch();


    useEffect(() => {
        if (cart.length > 0) {
            setOrder((prevOrder) => ({
                ...prevOrder,
                products: cart,
                grandTotal: calculateGrandTotal(),
            }));
        }
    }, [cart]);

    useEffect(() => {
        getCities();
    },[])
    const calculateGrandTotal = () => {
        return cart.reduce(
            (total, c) => (total += c.product.price * c.quantity),
            0
        );
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target;

        setOrder((prevOrder) => {
            if (name=="city" && value == "" || name=="district" && value=="") {
                console.log("INVALID CITY/DISTRICT")
            }
      

            if (type === "checkbox" && name === "sameAddress") {
                return {
                    ...prevOrder,
                    sameAddress: checked, 
                    billingAddress: checked ? prevOrder.shippingAddress : "", 
                };
            }

         
            return {
                ...prevOrder,
                [name]: value,
                ...(name === "shippingAddress" && prevOrder.sameAddress
                    ? { billingAddress: value }
                    : {}),
            };
        });
    };



    const handleOrderSubmit = () => {
        if (
            !order.receiverName ||
            !order.shippingAddress ||
            !order.contactNumber
        ) {
            alert("Lütfen tüm alanları doldurun!"); 
            return;
        }
        alert("Sipariş başarıyla gönderildi!"); 
        dispatch(SubmitOrder(order)); 
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Sipariş Sayfası
            </Typography>

            <div style={{ marginBottom: "20px" }}>
                <TextField
                    label="Alıcı Adı"
                    variant="outlined"
                    name="receiverName"
                    fullWidth
                    margin="normal"
                    value={order.receiverName}
                    onChange={handleChange}
                />
                <TextField
                    label="Teslimat Adresi"
                    variant="outlined"
                    fullWidth
                    multiline
                    name="shippingAddress"
                    rows={3}
                    margin="normal"
                    value={order.shippingAddress}
                    onChange={handleChange}
                />
                <TextField
                    label="Telefon Numarası"
                    variant="outlined"
                    fullWidth
                    name="contactNumber"
                    margin="normal"
                    value={order.contactNumber}
                    onChange={handleChange}
                />
                <TextField
                    label="Fatura Adresi"
                    variant="outlined"
                    fullWidth
                    multiline
                    name="billingAddress"
                    rows={3}
                    margin="normal"
                    value={order.billingAddress}
                    onChange={handleChange}
                    disabled={order.sameAddress} 
                />
                <div>
                    <label htmlFor="sameAddress">
                        <input
                            type="checkbox"
                            id="sameAddress"
                            name="sameAddress"
                            checked={order.sameAddress}
                            onChange={handleChange}
                        />
                        Teslimat adresini fatura adresiyle aynı yap
                    </label>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="city-label">Şehir</InputLabel>
                        <Select
                            labelId="city-label"
                            name="city"
                            value={order.city}
                            onChange={()=>handleChange}
                            label="Şehir"
                        >
                            {cities.map((city: CityModel) => (
                                <MenuItem key={city.id} value={city.name} onClick={()=>getDistricts(city.id) }>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="district-label"> District
                        </InputLabel>
                        <Select

                            labelId="district-label" name="district" value={order.district} onChange={() => handleChange} label="District">
                            {districts.map((district:DistrictModel) => (
                                <MenuItem key={district.id} value={district.name}>
                                    {district.name }
                                </MenuItem>
                            )) }


                        </Select>

                    </FormControl>

                </div>






            </div>


            <Typography variant="h5" gutterBottom>
                Ürünler
            </Typography>
            <Box>
                {cart.length > 0 ? (
                    cart.map((cartItem: MenuItemModel) => (
                        <div key={cartItem.product.id}>
                            <p>{cartItem.product.name}</p>
                            <p>{cartItem.product.price} ₺</p>
                        </div>
                    ))
                ) : (
                    <p>Sepetinizde ürün bulunmamaktadır.</p>
                )}
            </Box>


            <div style={{ marginTop: "20px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleOrderSubmit}
                >
                    Sipariş Gönder
                </Button>
            </div>
        </div>
    );
};

export default OrderPage;
