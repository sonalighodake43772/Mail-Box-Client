import { useState, } from "react";
import { Form ,Button} from "react-bootstrap";
import classes from './SignUp.module.css';
import {useHistory} from "react-router-dom"
import { mailActions } from "./store/auth-slice";
import { useDispatch } from "react-redux";

const SignUp = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true) 
  const history=useHistory();
  const dispatch = useDispatch();
  
  const emailHandler = (e) => {
    setEmail(e.target.value)
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  };

  const confirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value)
  };

  const submitHandler = async (e) => {
    e.preventDefault();
if (
      password.length >= 6 &&
      confirmPassword.length >= 6 &&
      password === confirmPassword
    ) {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyCImM5P9ds-51beVmCJrgAHSBBx72a8pBg ";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyCImM5P9ds-51beVmCJrgAHSBBx72a8pBg ";
      }

       fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        Headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
         
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              if (data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          if (isLogin) {
            console.log(data.idToken);
            const regex = /[.@]/g;
            const emailId = data.email.replace(regex, "");

            dispatch(
              mailActions.login({
                email: emailId,
                token: data.idToken,
              })
            );
            history.replace("/SendMail");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }else{
      if(password!==confirmPassword){
        alert("password and confirm password did not match")
      }
      else if(password.length<=8 && confirmPassword.length<=8){
        alert('please enter atleast 6 digit')
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  };

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
  
      <Form onSubmit={submitHandler} className={classes.auth}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div>
        <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email:</Form.Label>
        <Form.Control
            type="email"
           
            placeholder="Email"
            onChange={emailHandler}
            value={email}
            required
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
        <Form.Label>PassWord:</Form.Label>
        <Form.Control
            type="password"
           
            placeholder=" password"
            onChange={passwordHandler}
            value={password}
            required
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm password">
        <Form.Label>Confirm password:</Form.Label>
        <Form.Control
            type="password"
          
            placeholder="confirm password"
            onChange={confirmPasswordHandle}
            value={confirmPassword}
            required
          />
          </Form.Group>
          </div>
        <div>
        <Button variant="primary" type="submit" >{isLogin ? "Login" : "Sign up"}</Button><br/>
        {/* {isLoading && <p>sending request...</p>} */}
        <h4 type="button" onClick={switchAuthHandler}>
          {isLogin
            ? "Don't have an account?Sign Up"
            : "Already have an account? Login"}
        </h4>
        </div>
      </Form>
     



  );
};

export default SignUp;