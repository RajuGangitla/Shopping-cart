import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Formcontrol from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge'
import Nav from 'react-bootstrap/Nav'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';


const Header = () => {
    const { state: { cart }, dispatch,
        productDispatch, } = CartState()

    return (
        <Navbar bg="dark" variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand >
                    <Link href="/">Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <Formcontrol style={{ width: 500 }} placeholder='Search a Product' className='m-auto'
                    onChange={(e) => {
                        productDispatch({
                          type: "FILTER_BY_SEARCH",
                          payload: e.target.value,
                        });
                      }} />
                </Navbar.Text>
                <Nav>
                    <Dropdown align={{ lg: 'end' }}>
                        <Dropdown.Toggle variant='warning' >
                            <FaShoppingCart color='25px' fontSize="25px" />
                            <Badge bg='dark' style={{ fontSize: 10 }}>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }} align={{ lg: 'end' }}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((prod) => (
                                        <span className="cartitem" key={prod.id}>
                                            <img
                                                src={prod.image}
                                                className="cartItemImg"
                                                alt={prod.name}
                                            />
                                            <div className="cartItemDetail">
                                                <span>{prod.name}</span>
                                                <span>₹ {prod.price}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: prod,
                                                    })
                                                }
                                            />
                                        </span>
                                    ))}
                                    <Link to="/cart">
                                        <Button style={{ width: "95%", margin: "0 10px" }}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{ padding: 10 }}>Cart is Empty!</span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default Header