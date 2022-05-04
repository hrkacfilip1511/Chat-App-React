import { Link } from "react-router-dom";
import classes from "./Register.module.css";
import md5 from "md5";
import { useState, useRef } from "react";
import firebase from "../../firebase";
import { FaUserAlt, FaLock, FaLockOpen, FaEnvelope } from "react-icons/fa";
import LoadingSpinner from "../UI/LoadingSpinner";

const Register = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  // const [usersRef, setUsersRef] = useState(firebase.database().ref("users"));
  // const [isUserSave, setUserSave] = useState(false)
  const [isUsernameEnter, setUsernameEnter] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  let formIsValid = false;
  let newUser = {};
  const enteredUsernameIsValid = username.trim().length !== 0;
  const enteredEmailIsValid = email.trim().length !== 0;
  const enteredPasswordIsValid = password.length >= 6;
  const focusHandler = () => {
    setUsernameEnter(true);
    setLoading(false);
    setError(null);
  };
  const usernameInputHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const setUserSave = (createdUser) => {
    console.log(createdUser);
    fetch(
      "https://chat-app-f7953-default-rtdb.europe-west1.firebasedatabase.app/users.json",
      {
        method: "POST",
        body: JSON.stringify(createdUser),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("user saved");
      }
    });
  };

  const confirmationPasswordHandler = (e) => {
    setConfirmationPassword(e.target.value);
  };
  if (
    enteredUsernameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    password === confirmationPassword
  ) {
    formIsValid = true;
  }
  const registerHandler = (e) => {
    e.preventDefault();

    setLoading(true);
    if (formIsValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `https://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`,
            })
            .then(() => {
              newUser = {
                username: createdUser.user.displayName,
                photoURL: createdUser.user.photoURL,
              };
              setUserSave(newUser);
            })
            .catch((err) => {
              console.log(err);
              setError(err.message);
            });
          setLoading(false);
          // setError(null);

          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmationPassword("");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setError("Please fill in correctly required fields.");
    }
  };
  return (
    <div className={classes.registerContainer}>
      <div className={classes.title}>
        <h2>Register for Chat</h2>
      </div>
      <form onSubmit={registerHandler}>
        <div className={classes.username}>
          <FaUserAlt className={classes.icon} />
          <input
            type="text"
            id="name"
            value={username}
            onChange={usernameInputHandler}
            onFocus={focusHandler}
            placeholder="Username"
          />
        </div>
        <div className={classes.email}>
          <FaEnvelope className={classes.icon} />
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailInputHandler}
            onFocus={focusHandler}
            placeholder="Email"
          />
        </div>
        <div className={classes.password}>
          <FaLock className={classes.icon} />
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordInputHandler}
            onFocus={focusHandler}
            placeholder="Password"
          />
        </div>
        <div className={classes.passwordConfirmation}>
          <FaLockOpen className={classes.icon} />
          <input
            type="password"
            id="conf-pass"
            value={confirmationPassword}
            onChange={confirmationPasswordHandler}
            onFocus={focusHandler}
            placeholder="Confirm Password"
          />
        </div>
        <div className={classes.messageTxt}>
          <p>
            Already a user ? <Link to="/login">Login</Link>
          </p>
        </div>
        <div className={classes.actions}>
          <button type="submit">
            {isLoading ? <LoadingSpinner /> : "Create Account"}
          </button>
        </div>
      </form>

      {/* {isLoading && <LoadingSpinner />} */}
      {isError && <p className={classes.warningTxt}>{isError}</p>}
    </div>
  );
};
export default Register;
