import Login from '../Login/Login';

const RequireAuthentication = (protectedScreen, isLoggedIn) => {
  return isLoggedIn != true ? Login : protectedScreen;
};

export default RequireAuthentication;
