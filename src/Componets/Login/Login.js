import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../project_image/Logo.png'
import './Login.css'
import googleImg from '../../project_image/Icon/google.png'
import facebookImg from '../../project_image/Icon/fb.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../../Firebaseconfig';
import { useHistory, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [login,setlogin] = useState('login') 
    const [isSignedIn,setSignedIn] = useContext(userContext)
    let history = useHistory();
    let location = useLocation();

     let { from } = location.state || { from: { pathname: "/" } };

    const toogleLogin = (data) =>{
        setlogin(data)
    }

   
    let provider = new firebase.auth.GoogleAuthProvider();

    const signInWithGoogle = () =>{
        firebase.auth().signInWithPopup(provider)
        .then(data=>{
            const {email,displayName} = data.user
            const logInUser = {
                isSignedin:true,
                email: email,
                name: displayName,
                success:true
            }
            setSignedIn(logInUser)
            history.replace(from);

        })
        .catch(error =>{
            console.log(error)
        });
    }

    return (
        <div>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#"><img style={{height:"56px",wifth:"120.26px"}} src={logo} alt=""/></a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <a className="nav-link font-weight-bold" href="/news">News</a>
                            <a className="nav-link font-weight-bold" href="/destination">Destination</a>
                            <a className="nav-link font-weight-bold" href="/blog">Blog</a>
                            <a className="nav-link font-weight-bold" href="/contact">Contact</a>
                            <a className="nav-link font-weight-bold" href="#"><button className="nav-button">Login</button></a>
                           
                        </div>
                    </div>
                   
                </nav>
                
            </div>
            <div className="container">
                <div className="login-form">
                    {
                        login === 'login'?<h5>Login</h5>:<h5>Create an Account</h5>
                    }
                    <form style={{marginTop:"30px"}} action="">
                        {
                            login === 'createAccount' &&
                            <div>
                                <div class="form-group">
                            <input placeholder="First Name" required type="text" class="form-control" id="first-name"/>
                           </div>
                                <div class="form-group">
                                  <input placeholder="Last Name" required type="text" class="form-control" id="last-name"/>
                                </div> 
                            </div> 
                        }
                      <div class="form-group">
                        <input placeholder="Username or Email" required type="text" class="form-control" id="email"/>
                      </div> 
                      <div class="form-group">
                        <input placeholder="Password" required type="password" class="form-control" id="password"/>
                      </div>
                      {
                          login === 'createAccount' && 
                          <div class="form-group">
                                <input placeholder="Confirm Password" required type="password" class="form-control" id="password"/>
                          </div>
                      }
                     {
                         login === 'login' &&
                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <input type="checkbox"/>
                                <span>Remember me</span>
                            </div>
                            <div>
                                <a href="#">Forget password</a>
                            </div>
                         </div>
                     }
                      <button className="login-button">{login === 'login'?"Login":"Create Account"}</button>      
                    </form>
                    {
                        login === 'login' ? <p>Don't have an account? <span onClick={()=>toogleLogin('createAccount')} className="create-account">Create an account</span></p> :<p>Already have an account? <span onClick={()=>toogleLogin('login')} className="create-account">Login</span></p>
                    }
                    <p style={{textAlign:"center"}}>Or</p>
                    <div className="button-group">
                        <button> <img className="fb-img" src={facebookImg} alt=""/> Continue with facebook</button>
                        <button onClick={signInWithGoogle}><img className="google-img" src={googleImg} alt=""/> Continue with google</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;