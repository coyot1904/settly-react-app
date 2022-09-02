import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';

// pages
import Login from "./screens/Login";
import Register from "./screens/Register";
import Clients from "./screens/Clients";
import AddClinet from "./screens/Clients/Add/"

// redux config
import { createStore } from 'redux';
import rootReducer from "./redux/store";

const store = createStore(rootReducer)


const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="clients" element={<Clients />} />
          <Route path="addClinet" element={<AddClinet />} />
        </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);