class Auth {

  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static isAuthenticated() {
    return !!this.getToken()
  }

  static logout() {
    localStorage.removeItem('token')
  }

}

export default Auth
