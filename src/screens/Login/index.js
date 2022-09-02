// Libs
import React, { useState , useEffect } from "react"
import { Row , Container , Col , Form , Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import cookie from "js-cookie";
import { useDispatch } from 'react-redux';

// Non-UI Constants, Data
import { isObjEmpty } from "../../assets/utility/until";
import { setUser } from '../../redux/actions/userActions';

// Components


// Styles, styling constants
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/auth.css';

/**
 * @typedef {object} LoginProps
 */

/**
 * @param {LoginProps} props
 */

export default function Login(props) {

    const dispatch = useDispatch();

    useEffect(() => {
      let url = window.location.toString();
      let params = url?.split("?")[1]?.split("&");
      let obj = {};
      params?.forEach((el) => {
        let [k, v] = el?.split("=");
        obj[k] = v.replaceAll("%20", " ");
    });

    if(obj.register === 'true') {
        toast.success('You registeration has been successully.', {
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

    const navigate = useNavigate();

    const [formState, setFormState] = useState({

        email: '',
        password : '',
    });

    const SignInSchema = yup.object().shape({
        email: yup.string().required("Email is a required field.").email("Email must be a valid email."),
        password: yup.string().required("Password is a required field.").min(6),
    });
    
    const { register, handleSubmit , formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(SignInSchema),
    });

    const onSubmit = () => {
        if (isObjEmpty(errors)) {
          axios.post('http://127.0.0.1:8000/api/login', 
          {
            password: formState.password,
            email : formState.email,
            
          })
          .then(function (response) {
            cookie.set("jwt", response.data.token);
            dispatch(setUser(response.data));
            navigate("/clients");
          })
          .catch(function (error) {
            toast.error('Username or password is not correct', {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
        }
    };

    return (
        <Container>
            <Row className="aut authCotainerBox">
                <Col className="col-md-4 authCotainer">
                    <h4 className="title">Create your account</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>

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

                        <Button variant="primary" type="submit" className='authSubmit'>
                            LOGIN
                        </Button>
                        <label className="loginText">No account yet? <a href="/register">Create one here</a></label>
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