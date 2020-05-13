import socketIOClient from 'socket.io-client'

let baseURL
if (process.env.REACT_APP_API_VERSION === 'test') {
    baseURL = 'http://localhost:4545'
  } else {
    baseURL = 'https://api-catan.herokuapp.com'
  }

console.log('Sockets url', baseURL)
export const socket = socketIOClient(baseURL)

