import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import MainList from './components/MainList';
import Footer from './components/Footer';
import OrderConfirmation from './components/OrderConfirmation';



function App() {



    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} >   </Route>
                <Route path="login" element={<Login />} >   </Route>
                <Route path="register" element={<Register />} >   </Route>
                <Route path="menu" element={<Menu />} >   </Route>
                <Route path="mainList" element={<MainList />} >   </Route>
                <Route path="orderConfirmation"element={<OrderConfirmation />}></Route>

            </Routes>

            <Footer />
        </Router>
    )

}

export default App;