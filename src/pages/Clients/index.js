// Libs
import React, { useEffect } from "react"
import { Row , Container , Col , Button , Table , Pagination } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';

// Non-UI Constants, Data
import { getClient , setUser } from '../../redux/actions/userActions';

// Styles, styling constants
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/client.css';

export default function Clients() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const client = useSelector((state) => state.user);

    useEffect(() => {
       if (Cookies.get('jwt')) {
        axios.get(process.env.REACT_APP_BASE_URL+'user' , {
            headers: { 
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            }   
        })
        .then(function (response) {
            dispatch(setUser(response.data));
            dispatch(getClient(1));
        })
        .catch(function (error) {
            navigate("/");
        });
       } else {
        navigate("/");
       }
    }, []);

    const pagenation =  () => {
        if (client.client) {
            let items = [];
            for (let number = 1; number <= client.client.last_page; number++) {
                items.push(
                  <Pagination.Item key={number} active={number === client.client.current_page} onClick={(event) => paginationClicked(number)}>
                    {number}
                  </Pagination.Item>,
                );
            }
            return (
                <Pagination>{items}</Pagination>
            );
        }
    };

    const paginationClicked = (e) => {
        dispatch(getClient(e));
    };

    const onDeleteItem = (e) => {
        axios.get(process.env.REACT_APP_BASE_URL+'clinet/delete/'+e.target.id , {
            headers: { 
                'Authorization': `Bearer ${Cookies.get('jwt')}`,
            }   
        })
        .then(function (response) {
            dispatch(getClient(1));
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <Container>
            <Row className="clientCotainerBox">
                <Col className="col-md-4 clientCotainer">
                    <Button variant="primary" href="/addClinet" className="addBtn">Add new Client</Button>
                    <Table >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Client Name</th>
                                <th>Client Email</th>
                                <th>Client Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {client.client ?(
                                client.client.data.map(function(item, i){
                                    let image = "http://127.0.0.1:8000/public/Image/"+item.profile_picture;
                                    let editUrl = "/editClinet/?id="+item.id;
                                    return (
                                        <tr index={i}>
                                            <td>{client.client.from+i}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <img src={image} width="64" height="64" className="clientImage" alt="client_image"/>
                                            </td>
                                            <td>
                                                <Row className="editContainer">
                                                    <Button variant="warning" href={editUrl}>Edit</Button> 
                                                </Row>
                                                <Row>
                                                    <Button variant="danger" id={item.id} onClick={onDeleteItem}>Delete</Button>
                                                </Row> 
                                            </td>
                                        </tr> 
                                    )
                                  })
                            ) : null}
                        </tbody>
                     </Table>
                     {pagenation()}
                </Col>
            </Row>   
        </Container>
    );
}