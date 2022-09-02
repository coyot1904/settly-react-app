// Libs
import React, { useState , useEffect } from "react"
import { Row , Container , Col , Form , Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';

// Non-UI Constants, Data
import { getClient } from '../../redux/actions/userActions';

// Components


// Styles, styling constants
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/auth.css';

/**
 * @typedef {object} ClientsProps
 */

/**
 * @param {ClientsProps} props
 */

export default function Clients(props) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const state = useSelector((state) => state);

    console.log(state);

    useEffect(() => {
       if (Cookies.get('jwt')) {
        axios.get('http://127.0.0.1:8000/api/user' , {
            headers: { 
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            }   
        })
        .then(function (response) {
            console.log(response)
            //dispatch(getClient);
        })
        .catch(function (error) {
            navigate("/");
        });
       } else {
        navigate("/");
       }
    }, []);

    return (
        <Container>
            <a href="/addClinet">Add new Client</a>
        </Container>
    );
}