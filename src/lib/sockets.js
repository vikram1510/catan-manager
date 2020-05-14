import socketIOClient from 'socket.io-client'

let baseURL
let env = process.env.REACT_APP_API_VERSION

if (env === 'test') {
    baseURL = 'http://192.168.0.41:4545'
  } else {
    baseURL = 'https://catan-sockets-manager.herokuapp.com/'
  }

console.log('Sockets url', baseURL)
export const socket = socketIOClient(baseURL)

