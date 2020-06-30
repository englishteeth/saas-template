
export default class Authentication {

  login() {
    window.location.replace('http://localhost:9000/login');
  }

  logout() {
    window.location.replace('http://localhost:9000/logout');
  }
  
  getProfile() {
    return {};
  }
  
  isAuthenticated() {
   return true; 
  }

}