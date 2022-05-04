import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from "./components/HomePage";
import firebase from "../src/firebase";
import { useEffect } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Provider>
  );
}
const store = configureStore({ reducer: rootReducer }, composeWithDevTools);

export default App;
