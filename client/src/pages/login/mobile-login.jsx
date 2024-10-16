import "./mobile-login.css";
import axios from "axios";
import { useNavigate } from "@solidjs/router";

function MobileLogin() {
  const navigate = useNavigate();
  return (
    <div class="mobile-login-container">
      <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div class="signup">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios({
                method: "post",
                url: "http://localhost:3000/auth/login",
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
            <label for="chk" aria-hidden="true">
              Sign up
            </label>
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
            <input
              type="text"
              name="name"
              placeholder="User name"
              required=""
            />
            <input type="email" name="email" placeholder="Email" required="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div class="login">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios({
                method: "post",
                url: "http://localhost:3000/auth/login",
                data: {
                  id: +e.target.id.value,
                  password: e.target.password.value,
                },
              }).then(function (res) {
                localStorage.setItem("access_token", res.data.access_token);
                navigate("/profile");
              });
            }}
          >
            <label for="chk" aria-hidden="true">
              Login
            </label>
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
            <input type="number" name="id" placeholder="ID" required="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required=""
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MobileLogin;
