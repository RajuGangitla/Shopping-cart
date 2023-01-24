import { CartState } from '../context/Context';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Rating from './Rating';
import Form from 'react-bootstrap/Form'
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  const { state: { cart }, dispatch } = CartState()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0))
  }, [cart])
  return (
    <div className='home'>
      <div className="productContainer">
        <ListGroup>
          {
            cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row >
                  <Col md={2}>
                    <Image src={item.image} fluid rounded></Image>
                  </Col>
                  <Col md={2}>
                    <span>{item.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>Rs.{item.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rating={item.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control as="select" value={item.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: item.id,
                            qty : e.target.value,
                          },
                        })
                      }>
                      {[...Array(item.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant='light'
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        })
                      }
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>

                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className='title'> Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 300, fontSize: 20 }}>Total: Rs.{total}</span>
        <Button type='button' disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}
export default Cart