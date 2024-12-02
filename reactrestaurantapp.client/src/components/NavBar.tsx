
import { Link } from 'react-router-dom'
import { useState } from 'react';
import Cart from './Cart';


    const Navbar = () => {

        const [isCartVisible, setCartVisible] = useState(false);
        const [isLogged, setIsLogged] = useState(false);


        return (
            <nav style={{ backgroundColor: '#333', padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <div>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>MyApp</Link>
                    </div>


                    <div>
          
      
                        <div
                            style={{ position: 'relative', display: 'inline-block', marginLeft: '15px', cursor: 'pointer' }}
                            onClick={() => setCartVisible(true)}
                            onDoubleClick={() => setCartVisible(false)}
                        >
                            <span style={{ color: 'white', marginRight:30 }}>🛒 Cart</span>

                            {/* Cart Items Dropdown */}
                            {isCartVisible && (
                         <Cart/>
                            )}

                            {isLogged ? (
                                <Link
                                    to="/logout"
                                    style={{ color: 'white', textDecoration: 'none',marginRight:10 }}
                                >
                                    Logout
                                </Link>
                            ) : (
                                <Link
                                    to="/login" onClick={() => setIsLogged(true)}
                                    style={{ color: 'white', textDecoration: 'none', marginRight: 10 }}
                                >
                                    Login
                                </Link>
                            )}

                            <Link
                                to="/register"
                                style={{ color: 'white', textDecoration: 'none' }}
                            >
                                Register

                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };

export default Navbar;

