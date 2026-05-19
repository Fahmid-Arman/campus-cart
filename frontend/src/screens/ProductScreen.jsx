import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { useCreateReportMutation } from '../slices/reportsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // For now we default to qty 1 since we aren't doing complex stock.
  const qty = 1;

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  const contactSellerHandler = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate(`/chat/${product.seller._id}`);
    }
  };

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReport, { isLoading: isReporting }] = useCreateReportMutation();

  const submitReportHandler = async (e) => {
    e.preventDefault();
    if (!reportReason.trim()) {
      toast.error('Please enter a reason for reporting');
      return;
    }
    try {
      await createReport({
        reportedProductId: productId,
        reportedUserId: product.seller._id,
        reason: reportReason,
      }).unwrap();
      toast.success('Report submitted successfully');
      setShowReportModal(false);
      setReportReason('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.title} description={product.description} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.title} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Condition:</strong> {product.condition}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Category:</strong> {product.category}
                </ListGroup.Item>
                <ListGroup.Item>Price: Tk {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
                {product.seller && (
                  <ListGroup.Item>
                    <strong>Listed by:</strong> {product.seller.name}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>Tk {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.status === 'Available' ? 'Available' : 'Sold'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.status === 'Sold'}
                      onClick={addToCartHandler}
                    >
                      Request to Buy
                    </Button>
                  </ListGroup.Item>

                  {product.seller && (!userInfo || userInfo._id !== product.seller._id) && (
                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        variant='outline-primary'
                        type='button'
                        onClick={contactSellerHandler}
                      >
                        Contact Seller
                      </Button>
                    </ListGroup.Item>
                  )}

                  {product.seller && (!userInfo || userInfo._id !== product.seller._id) && (
                    <ListGroup.Item>
                      <Button
                        className='btn-block'
                        variant='outline-danger'
                        type='button'
                        onClick={() => setShowReportModal(true)}
                      >
                        Report Product
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Report Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitReportHandler}>
                <Form.Group controlId='reportReason' className='my-2'>
                  <Form.Label>Reason for reporting</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Why are you reporting this product?'
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <div className='d-flex justify-content-end mt-3'>
                  <Button variant='secondary' onClick={() => setShowReportModal(false)} className='me-2'>
                    Cancel
                  </Button>
                  <Button type='submit' variant='danger' disabled={isReporting}>
                    {isReporting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductScreen;
