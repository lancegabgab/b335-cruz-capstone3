import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../style.css';
import 'react-bootstrap';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setMobileNoError('');
    setPasswordError('');

    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      mobileNo !== '' &&
      password !== '' &&
      confirmPassword !== ''
    ) {
      if (!email.includes('@')) {
        setEmailError('Email must contain @');
      }

      if (mobileNo.length !== 11) {
        setMobileNoError('Mobile number must be 11 digits');
      }

      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
      }

      if (
        email.includes('@') &&
        mobileNo.length === 11 &&
        password.length >= 8 &&
        password === confirmPassword
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      setIsActive(false);

      if (firstName === '') {
        setFirstNameError('First name cannot be empty');
      }

      if (lastName === '') {
        setLastNameError('Last name cannot be empty');
      }

      if (email === '') {
        setEmailError('Email cannot be empty');
      }

      if (mobileNo === '') {
        setMobileNoError('Mobile number cannot be empty');
      }

      if (password === '') {
        setPasswordError('Password cannot be empty');
      }
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.message === 'Registered Successfully') {
          setFirstName('');
          setLastName('');
          setEmail('');
          setMobileNo('');
          setPassword('');
          setConfirmPassword('');
          alert('Registration Successful');
        } else {
          alert('Something went wrong');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('Error during registration. Please try again.');
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary py-4 ">
      <Form
        onSubmit={(event) => registerUser(event)}
        className="bg-white p-3 rounded w-25 font-details"
      >
        <h1 className="mb-3 text-center font-highlight">Register</h1>

        <Form.Group className="mb-2">
          <Form.Label>First Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            required
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            className="rounded-0 font-details"
          />
          {firstNameError && <div className="text-danger">{firstNameError}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Last Name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            required
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            className="rounded-0 font-details"
          />
          {lastNameError && <div className="text-danger">{lastNameError}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="rounded-0 font-details"
          />
          {emailError && <div className="text-danger">{emailError}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>MobileNo: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter MobileNo"
            required
            onChange={(event) => {
              setMobileNo(event.target.value);
            }}
            className="rounded-0 font-details"
          />
          {mobileNoError && <div className="text-danger">{mobileNoError}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="rounded-0 font-details"
          />
          {passwordError && <div className="text-danger">{passwordError}</div>}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            className="rounded-0 font-details"
          />
        </Form.Group>

        {isActive === true ? (
          <Button
            type="submit"
            id="submitBtn"
            className="btn btn-success border rounded-0 font-details"
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="danger"
            type="submit"
            id="submitBtn"
            disabled
            className="font-details"
          >
            Please complete the form!
          </Button>
        )}
      </Form>
    </div>
  );
}
