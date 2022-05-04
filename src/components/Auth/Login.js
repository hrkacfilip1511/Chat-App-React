import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import firebase from "../../firebase";
import LoadingSpinner from "../UI/LoadingSpinner";

const Login = () => {
  let formIsValid = false;
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const enteredEmailIsValid = email.includes("@");
  const enteredPasswordIsValid = password.length >= 6;
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((signedInUser) => {
          console.log(signedInUser);
        })
        .catch((err) => {
          setError(err);
        });
    }
    setLoading(false);
    setEmail("");
    setPassword("");
  };
  return (
    <div className={classes.loginContainer}>
      <div className={classes.title}>
        <h2>Login for Chat</h2>
      </div>
      <form onSubmit={loginHandler}>
        <div className={classes.email}>
          <FaEnvelope className={classes.icon} />
          <input
            type="text"
            id="username"
            placeholder="Email"
            onChange={emailInputHandler}
          />
        </div>
        <div className={classes.password}>
          <FaLock className={classes.icon} />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={passwordInputHandler}
          />
        </div>
        <div className={classes.messageText}>
          <p>
            Don't have an account? <Link to="/register">Register for free</Link>
          </p>
        </div>
        <div className={classes.actions}>
          <button type="submit">
            {isLoading ? <LoadingSpinner /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
