import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';

import Footer from './components/Footer';
import OrderConfirmation from './components/OrderConfirmation';
import Order from './components/Order';
/*import Card from './components/Card';*/



function App() {



    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} >   </Route>
                <Route path="login" element={<Login />} >   </Route>

                <Route path="register" element={<Register />} >   </Route>
                <Route path="menu" element={<Menu />} >   </Route>
                <Route path="order" element={<Order/> }></Route>
         
                <Route path="orderConfirmation"element={<OrderConfirmation />}></Route>
             {/*   <Route path="card"element={<Card />}></Route>*/}

            </Routes>

            <Footer />
        </Router>
    )

}

export default App;