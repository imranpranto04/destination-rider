import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: ''
    })

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
    //         .then((result) => {
    //             const user = result.user;
    //             console.log(user);
    //             setUser(user);
    //             setLoggedInUser(user);
    //             history.replace(from);

    //         }).catch((error) => {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             var email = error.email;
    //             var credential = error.credential;
    //         });
    // }
    .then(res => {
        const {displayName, photoURL, email} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(signedInUser);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
    }

    const handleChangeValue = (e) => {
        console.log(e.target.name, e.target.value);
        const newUserInfo = { ...user };
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }


    const handleSubmit = (e) => {

        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    loggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);

                    // console.log('sign in user info', res.user);
                })
                .catch(function (error) {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        e.preventDefault();
    }

    return (
        <div className="container">
            <div>
                {/* <h1>Name: {user.name, user.displayName}</h1>
                <h1>Email: {user.email}</h1> */}
                {
              user.isSignedIn && <div>
                <p>Welcome, {user.name}!</p>
                <p>Your email: {user.email}</p>
              </div>
            }
                <Form>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" onChange={() => setNewUser(!newUser)} label="New User Sign Up" />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        {newUser && <Form.Control onBlur={handleChangeValue} type="name" placeholder="Name" name='name' />}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={handleChangeValue} type="email" placeholder="Enter email" name='email' />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handleChangeValue} type="password" placeholder="Password" name='password' />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
               
                <p style={{ color: 'red' }} >{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged in'} successfully</p>
                }
                <br />
            </div>

            <Button onClick={handleGoogleSignIn}>Google</Button>
        </div>
    );
};

export default Login;