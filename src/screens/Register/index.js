// Libs
import React, { useState , useRef } from "react"
import { Row , Container , Col , Form , Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

// Non-UI Constants, Data
import { isObjEmpty } from "../../assets/utility/until";

// Components


// Styles, styling constants
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/auth.css';

/**
 * @typedef {object} RegisterProps
 */

/**
 * @param {RegisterProps} props
 */

export default function Register(props) {

    const CAPTCHA_SITE_KEY = "6LcdxMAhAAAAAEELQOZ9_7qmD1x18yY3xaAEmBD8";

    const recaptchaRef = useRef(null);

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        name: '',
        surname: '',
        email: '',
        password : '',
        passwordConfirmation : '',
        emailConfirmation : '',
        recaptcha : false,
    });

    const SignInSchema = yup.object().shape({
        email: yup.string().required("Email is a required field.").email("Email must be a valid email."),
        password: yup.string().required("Password is a required field.").min(6),
        name: yup.string().required("First name is a required field.").min(6),
        surname: yup.string().required("Surname is a required field.").min(6),
        passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        emailConfirmation: yup.string().oneOf([yup.ref('email'), null], 'Please Confirm your email address'),
    });
    
    const { register, handleSubmit , formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(SignInSchema),
    });

    const onSubmit = () => {
        if (formState.recaptcha === true) {
            if (isObjEmpty(errors)) {
              axios.post(process.env.REACT_APP_BASE_URL+'register', 
              {
                name: formState.name,
                password: formState.password,
                email : formState.email,
                surname : formState.surname,
                
              })
              .then(function (response) {
                if(response.data.message === 'true')
                {
                  navigate("/?register=true");
                }
                else
                {
                  toast.error('Email is already exit in our database!', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            }
        } else {
            toast.error('Please try to check recapcha', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Container>
            <Row className="aut authCotainerBox">
                <Col className="col-md-4 authCotainer">
                    <h4 className="title">Create your account</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <input 
                              autoFocus
                              name="name"
                              id="name"
                              placeholder="First name"
                              className={classnames({ "is-invalid": errors["name"] } , 'form-control') }
                              {...register('name')} 
                              onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            {errors.name?.message && <p className="error">{errors.name?.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="surname">
                            <input 
                              autoFocus
                              name="surname"
                              id="surname"
                              placeholder="Surname"
                              className={classnames({ "is-invalid": errors["surname"] } , 'form-control') }
                              {...register('surname')} 
                              onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            {errors.surname?.message && <p className="error">{errors.surname?.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <input 
                              autoFocus
                              name="email"
                              id="email"
                              placeholder="Email Address"
                              className={classnames({ "is-invalid": errors["email"] } , 'form-control') }
                              {...register('email')} 
                              onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            {errors.email?.message && <p className="error">{errors.email?.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="emailConfirmation">
                            <input 
                              autoFocus
                              name="emailConfirmation"
                              id="emailConfirmation"
                              placeholder="Confirm email address"
                              className={classnames({ "is-invalid": errors["emailConfirmation"] } , 'form-control') }
                              {...register('emailConfirmation')} 
                              onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            {errors.emailConfirmation?.message && <p className="error">{errors.emailConfirmation?.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <input 
                              autoFocus
                              name="password"
                              id="password"
                              type="password"
                              placeholder="Password"
                              className={classnames({ "is-invalid": errors["password"] } , 'form-control') }
                              {...register('password')} 
                              onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            {errors.password?.message && <p className="error">{errors.password?.message}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="passwordConfirmation">
                            <input 
                              autoFocus
                              name="passwordConfirmation"
                              id="passwordConfirmation"
                              type="password"
                              placeholder="Retype your password"
                              className={classnames({ "is-invalid": errors["passwordConfirmation"] } , 'form-control') }
                              {...register('passwordConfirmation')} 
                              onChange={(e) =>
                                setFormState({
                                  ...formState,
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            {errors.passwordConfirmation?.message && <p className="error">{errors.passwordConfirmation?.message}</p>}
                        </Form.Group>

                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={CAPTCHA_SITE_KEY}
                            onChange={(value) => {
                                setFormState({
                                  ...formState,
                                  recaptcha: true,
                                })
                            }}
                            size="normal"
                            className="captcha"
                        />

                        <Button variant="primary" type="submit" className='authSubmit'>
                            CREATE ACCOUNT
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ToastContainer
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        </Container>
    );
}