
import { Link } from 'react-router-dom'
import { useState } from 'react';


    const Navbar = () => {

        const [isCartVisible, setCartVisible] = useState(false);
        const [isLogged, setIsLogged] = useState(false);
        const cartItems = [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
            { id: 3, name: 'Product 3' },
        ];

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
                                <div style={{
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    marginTop: '5px',
                                    padding: '10px',
                                    zIndex: 1000,
                                    minWidth: '150px'
                                }}>
                                    <h4 style={{ margin: 0 }}>Cart Items:</h4>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {cartItems.map(item => (
                                            <Link to="" style={{ textDecorationLine: 'none' }}> 
                                                <li key={item.id} style={{ margin: '5px 0' }}>
                                                    {item.name}
                                                </li>
                                            </Link>
                                          


                                        ))}
                                    </ul>



                                </div>
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

