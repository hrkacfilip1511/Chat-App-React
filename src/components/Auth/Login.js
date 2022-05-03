import { Link } from "react-router-dom";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className="loginContainer">
      <div className={classes.title}>
        <h2>Login for Chat</h2>
      </div>
      <form>
        <div className={classes.username}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={classes.password}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className={classes.messageText}>
          <p>
            Don't have an account? <Link to="/register">Register for free</Link>
          </p>
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
