import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";
import history from "../history";
import Parse from "parse";
import swal from "sweetalert";

const users = new Parse.User();

export const login = (email, password) => {
  return dispatch => {
    users.setUsername(email);
    users.setPassword(password);
    users.logIn().then(
      res => {
        if (res.get("accountStatus") !== 10) {
          swal("Warning", "you are not verified user contact Admin", "warning");
          return;
        } else {
          localStorage.setItem("token", res.get("sessionToken"));
          history.push("/totalUser");
          dispatch(loginSuccess(res.get("sessionToken")));
        }
      },
      error => {
        dispatch(loginFail(error.message));
      }
    );
  };
};

export const loginSuccess = user => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user: user
  };
};

export const loginFail = message => {
  toast.error("Invalid Email or Password");
  return {
    type: actionTypes.LOGIN_FAIL,
    message: message
  };
};

export const logout = () => {
  return dispatch => {
    Parse.User.logOut().then(res => {
      dispatch(logoutSuccess());
      history.push("/");
    });
  };
};
export const logoutSuccess = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("countryCode");
  document.cookie = "remember_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

var hours = 8; // Reset when storage is more than 8 hours
var now = new Date().getTime();
var setupTime = localStorage.getItem("setupTime");
if (setupTime == null) {
  localStorage.setItem("setupTime", now);
} else {
  if (now - setupTime > hours * 60 * 60 * 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("countryCode");
    localStorage.setItem("setupTime", now);
  }
}
export const getUser = () => {
  return dispatch => {
    // axios.get('/users/userinfo')
    //   .then(res => {
    //     dispatch(loginSuccess(res.data));
    //   });
  };
};

export const register = user => {
  return dispatch => {
    //delete user.confirmPassword;
    const email = user.email;
    const username = user.userName;
    const password = user.password;
    users.setEmail(email);
    users.setUsername(username);
    users.setPassword(password);
    users.set("accountStatus", 0);
    users.signUp().then(
      res => {
        history.push("/verifyEmail");
      },
      error => {
        dispatch(registerFail(error.message));
      }
    );
  };
};
export const registerFail = msg => {
  toast.error(msg);
  return {
    type: actionTypes.REGISTER_FAIL,
    msg: msg
  };
};

export const forgetPassword = user => {
  return dispatch => {
    Parse.User.requestPasswordReset(user.email)
      .then(res => {
        history.push("/verifyPassword");
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };
};

export const resetPassword = user => {
  return dispatch => {
    // axios.put("/passwords/reset", { "user": user })
    //   .then(res => {
    //     history.push('/');
    //     toast.success("Your Password was updated Successfully.");
    //   });
  };
};
