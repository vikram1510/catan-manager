import axios from 'axios'
import { resourceArray } from './config'

let baseURL

if (process.env.REACT_APP_API_VERSION === 'test') {
  baseURL = 'http://localhost:3030'
} else {
  baseURL = 'https://api-catan.herokuapp.com'
}

console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(baseURL);

let instance = axios.create({ baseURL })

const getAllPlayers = () => {

  const response =  instance
  .get('/players')
  .then(res => res.data)
  .catch(err => console.log('Error in getting data', err.response.data))
  
  return response
}

const getPlayerByName = (name) => {

  const response =  instance
  .get('/players?name=' + name)
  .then(res => {
    if (res.data.length === 1) {
      return res.data[0] ?? undefined
    }
  } )
  .catch(err => console.log('Error in getting player by name ' + name, err.response.data))

  return response
}


const getPlayerByID = (id) => {

  const response =  instance
  .get('/players/' + id)
  .then(res => {
    if (res.data) {
      return res.data
    }
    console.log('Player with id: ' + id + ' does not exist')
  })
  .catch(err => console.log('Error in getting player by id ' + id, err))
  
  return response
}

const createPlayer = (name) => {

  const response =  instance
  .post('/players/', {name})
  .then(res => res.data._id)
  .catch(err => console.log('Error in creating player: ' + name, err.response.data))

  return response
}

const deletePlayer = (id) => {
  
  instance
  .delete('/players/' + id)
  .then(_ => console.log('Successfully deleted player: ' + id))
  .catch(err => console.log('Error in deleting player', err.response.data))

}

const updatePlayer = (id, payload) => {

  return instance
  .put('/players/' + id, payload)
  .then(res => res.data)
  .catch(err => console.log('Error in updating player: ' + id + ' with: ' + payload, err.response.data))
}

const transaction = ({fromId, toId, amounts}) => {

  let verifiedAmounts = {}

  resourceArray.forEach((resource) => {
    if (amounts?.[resource]) {
      verifiedAmounts[resource] = amounts[resource]
    } 
  })
    

  console.log(amounts)
  console.log('verified to:',verifiedAmounts)

  return instance
  .post('/players/transaction', {fromId, toId, amounts:verifiedAmounts} )
  .then(res => res.data)
  .catch(err => console.log('Error in performing transaction', fromId, toId, amounts))
}

console.log('loading api')
transaction('asdad','dssadd',{'brick':2,'aaa':1})


const api = {
  getAllPlayers,
  getPlayerByName,
  getPlayerByID,
  createPlayer,
  deletePlayer,
  updatePlayer,
  transaction
}

export default api


