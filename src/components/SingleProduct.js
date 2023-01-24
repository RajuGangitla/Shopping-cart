import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { CartState } from '../context/Context';


const SingleProduct = ({ item }) => {

  const { state: { cart }, dispatch } = CartState()
  return (
    <div className='products'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }} >
            <span>
              Rs.{item.price}
            </span>
            {
              item.fastDelivery ? (<div>Fast delivery</div>) : (<div>4 days delivery</div>)
            }
            <Rating rating={item.ratings} />
          </Card.Subtitle>
          {
            cart.some(p => p.id === item.id) ?
              (<Button variant="danger"
                onClick={() => {
                  dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: item
                  })
                }}
              >Remove from Cart</Button>)
              :
              (<Button variant="primary"
                onClick={() => {
                  dispatch({
                    type: 'ADD_TO_CART',
                    payload: item
                  })
                }}
                disabled={!item.inStock}>{item.inStock ? "Add to Cart" : "Out of Stock"}</Button>)
          }
        </Card.Body>
      </Card>
    </div>
  )
}
export default SingleProduct