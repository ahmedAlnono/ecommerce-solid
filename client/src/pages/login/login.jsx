import { Show, createSignal } from "solid-js";
import "./login-desktop.css";
import MobileLogin from "./mobile-login.jsx";
import axios from "axios";
import { useNavigate } from "@solidjs/router";
const Login = () => {
  const [isLogedIn, setIsLogedIn] = createSignal(false);
  const isLogedInLocal = localStorage.getItem("access_token");
  if (isLogedInLocal) {
    setIsLogedIn(true);
  }
  const navigate = useNavigate();
  if(isLogedInLocal){
    return (
      <>
        <div class="flex justify-center items-center flex-col">
            <h1 class="text-6xl text-green-400 text-center">you are logged in</h1>
            <button
            class="bg-slate-700 text-green-100 p-3 rounded-lg"
            onClick={()=>{
              navigate('/profile');
            }}
            >show Profile</button>
        </div>
      </>
    )
  }
  return (
    <div>
      <div
        classList={{
          "login-container": true,
          "right-panel-active": isLogedIn(),
        }}
        id="container"
      >
        <div class="form-container sign-up-container">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios({
                method: "post",
                url: "http://localhost:3000/auth/signup",
                data: {
                  name: e.target.name.value,
                  email: e.target.email.value,
                  password: e.target.password.value,
                },
              }).then(function (res) {
                localStorage.setItem("access_token", res.data.access_token);
                navigate("/home");
              });
            }}
          >
            <h1>Create Account</h1>
            <div class="social-container">
              <a
                href="#h"
                style="background-color:blue; color:white;"
                class="social"
              >
                <i class="fab fa-facebook-f" />f
              </a>
              <a href="#h" class="social" style="color:white;background:red">
                <i class="fab fa-google-plus-g" />G
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios({
                method: "post",
                url: "http://localhost:3000/auth/signin",
                data: {
                  id: +e.target.id.value,
                  password: e.target.password.value,
                },
              }).then(function (res) {
                localStorage.setItem("access_token", res.data.access_token);
                navigate('/home');
              });
            }}
          >
            <h1>Sign in</h1>
            <div class="social-container">
              <a href="#h" style="color:blue;" class="social">
                <i class="fab fa-facebook-f" />f
              </a>
              <a href="#h" class="social" style="color:red;">
                <i class="fab fa-google-plus-g" />G
              </a>
            </div>
            <span>or use your account</span>
            <input type="number" name="id" placeholder="ID" />
            <input type="password" name="password" placeholder="Password" />
            <a href="#h">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                class="ghost"
                onClick={() => {
                  setIsLogedIn(!isLogedIn());
                }}
              >
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button
                class="ghost"
                onClick={() => {
                  setIsLogedIn(!isLogedIn());
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <MobileLogin />   
    </div>
  );
};

export default Login;
