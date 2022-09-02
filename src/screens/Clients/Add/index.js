// Libs
import React, { useState , useEffect } from "react"
import { Row , Container , Col , Form , Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import classnames from "classnames";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

// Non-UI Constants, Data
import { isObjEmpty } from "../../../assets/utility/until";


// Components


// Styles, styling constants
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/auth.css';

/**
 * @typedef {object} ClientsProps
 */

/**
 * @param {ClientsProps} props
 */

export default function AddClinet(props) {

    const navigate = useNavigate();

    const state = useSelector((state) => state);

    useEffect(() => {
       if (state.user != null) {
        axios.get('http://127.0.0.1:8000/api/user' , {
            headers: { 
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            }   
        })
        .then(function (response) {
            console.log(response);
          //cookie.set("jwt", response.data.token);
          //dispatch(setUser(response.data));
          //navigate("/clients");
        })
        .catch(function (error) {
            console.log(error)
        });
       } else {
        navigate("/clients");
       }
    }, []);

    const [formState, setFormState] = useState({
        name: '',
        email: '',
    });

    const SignInSchema = yup.object().shape({
        email: yup.string().required("Email is a required field.").email("Email must be a valid email."),
        name: yup.string().required("Clinet name is a required field.").min(6),
    });
    
    const { register, handleSubmit , formState: { errors } } = useForm({
        mode: "onSubmit",
        resolver: yupResolver(SignInSchema),
    });

    const onSubmit = () => {
        if (isObjEmpty(errors)) {
              axios.post('http://127.0.0.1:8000/api/clinet/add', 
              {
                name: formState.name,
                email : formState.email,
                image : formState.image,
              },
              {
                headers: { 
                    'Authorization': `Bearer ${Cookies.get('jwt')}`,
                    'Content-Type': 'multipart/form-data'
                }   
              })
              .then(function (response) {
                navigate("/clients?add=true");
              })
              .catch(function (error) {
                toast.error('Image is required !', {
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

    const onChangeFile = (e) => {
        setFormState({
            ...formState,
            image: e.target.files[0],
        })
    };

    return (
        <Container>
            <Row className="aut authCotainerBox">
                <Col className="col-md-4 authCotainer">
                    <h4 className="title">Create new client</h4>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="name">
                            <input 
                              autoFocus
                              name="name"
                              id="name"
                              placeholder="Client Name"
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
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <input type="file"  {...register("image", { required: true })} onChange={e => onChangeFile(e)} accept="image/png, image/gif, image/jpeg" />
                              {errors.image?.message && <p className="error">{errors.image?.message}</p>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className='authSubmit'>
                            CREATE CLINET
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