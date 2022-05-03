import { Link } from "react-router-dom";
import classes from "./Register.module.css";
import { useState } from "react";
import firebase from "../../firebase";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  // const [isFormValid, setFormValid] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((createdUser) => {
        console.log(createdUser);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <div className={classes.title}>
        <h2>Register for Chat</h2>
      </div>
      <form onSubmit={registerHandler}>
        <div className={classes.username}>
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={classes.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={classes.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={classes.passwordConfirmation}>
          <label htmlFor="conf-pass">Confirm Password</label>
          <input
            type="password"
            id="conf-pass"
            value={confirmationPassword}
            onChange={(e) => {
              setConfirmationPassword(e.target.value);
            }}
          />
        </div>
        <div className={classes.messageTxt}>
          <p>
            Already a user ? <Link to="/login">Login</Link>
          </p>
        </div>
        <div className={classes.actions}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};
export default Register;
