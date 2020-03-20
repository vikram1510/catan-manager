import axios from 'axios'


let instance = axios.create({
  baseURL: 'http://localhost:3030'
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
  .then(res => res.data[0]?._id ?? undefined )
  .catch(err => console.log('Error in getting player by name ' + name, err.response.data))

  return response
}


const getPlayerByID = (id) => {

  const response =  instance
  .get('/players/' + id)
  .then(res => res.data)
  .catch(err => console.log('Error in getting player by id ' + id, err.response.data))
  
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

  instance
  .delete('/players/' + id, payload)
  .then(_ => console.log('Successfully updated player: ' + id + ' with: ' + payload))
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


