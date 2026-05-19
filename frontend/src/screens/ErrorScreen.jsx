import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useRouteError } from 'react-router-dom';

const ErrorScreen = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Container className='text-center my-5'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button as={Link} to='/' variant='primary'>
        Go Back Home
      </Button>
    </Container>
  );
};

export default ErrorScreen;
