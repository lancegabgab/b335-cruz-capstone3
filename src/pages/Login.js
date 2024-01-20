import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Container } from 'react-bootstrap';

//export default function Login({ setUser })
export default function Login() {
  // Receive setUser as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  function authenticate(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem('access', data.access);
          retrieveUserDetails(data.access);
          alert(`You are now logged in`);
        } else if (data.error === 'No Email Found') {
          alert(`Email not found`);
        } else {
          alert(`${email} does not exist`);
        }
      });

    setEmail('');
    setPassword('');
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });

        console.log(user);
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Container>
      <Form onSubmit={(e) => isActive && authenticate(e)}>
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group controlId="userEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {isActive ? (
          <Button
            variant="primary"
            type="submit"
            id="submitBtn"
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="danger"
            type="submit"
            id="submitBtn"
            disabled
          >
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
}
