// Is logged in

export const authenticate = () => {
  let data = localStorage.getItem("data");
  if (data != null) return true;
  else return false;
};

// do Login
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// Do logout
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

// get Current logged in user
export const getCurrentUser = () => {
  if (authenticate()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else {
    return null;
  }
};

// fetch token of logged in user
export const getToken = () => {
  if (authenticate()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
};
