import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clients from "./pages/Clients";
import AddClinet from "./pages/Clients/Add/";
import EditClient from "./pages/Clients/Edit";

// redux config
import { createStore , applyMiddleware } from 'redux';
import rootReducer from "./redux/store";
import thunk from 'redux-thunk'

const store = createStore(rootReducer , applyMiddleware(thunk))

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="clients" element={<Clients />} />
          <Route path="addClinet" element={<AddClinet />} />
          <Route path="editClinet" element={<EditClient />} />
        </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);