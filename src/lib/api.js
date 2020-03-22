import axios from 'axios'

// let baseURL

// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:3030'
// } else {
//   baseURL = 'https://api-catan.herokuapp.com'
// }

console.log(process.env);
console.log(process.env.NODE_ENV);
// console.log(baseURL);
console.log('hardcoded baseurl for now to : https://api-catan.herokuapp.com')

let instance = axios.create({
  baseURL: 'https://api-catan.herokuapp.com'
})

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


const api = {
  getAllPlayers,
  getPlayerByName,
  getPlayerByID,
  createPlayer,
  deletePlayer,
  updatePlayer
}

export default api


