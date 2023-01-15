import axios from "axios";
import { resourceArray } from "./config";

let baseURL;

if (process.env.REACT_APP_API_VERSION === "test") {
  baseURL = "http://192.168.0.41:3030";
} else {
  baseURL = "http://apicatan-env.eba-nps4phg8.eu-west-1.elasticbeanstalk.com/";
}

console.log("Connecting to database", baseURL);

let instance = axios.create({ baseURL });

const getAllPlayers = () => {
  const response = instance
    .get("/players")
    .then((res) => res.data)
    .catch((err) => console.log("Error in getting data", err.response.data));

  return response;
};

const getPlayerByName = (name) => {
  const response = instance
    .get("/players?name=" + name)
    .then((res) => {
      if (res.data.length === 1) {
        return res.data[0] ?? undefined;
      }
    })
    .catch((err) =>
      console.log("Error in getting player by name " + name, err.response.data)
    );

  return response;
};

const getPlayerByID = (id) => {
  const response = instance
    .get("/players/" + id)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
      console.log("Player with id: " + id + " does not exist");
    })
    .catch((err) => console.log("Error in getting player by id " + id, err));

  return response;
};

const createPlayer = (name) => {
  const response = instance
    .post("/players/", { name })
    .then((res) => res.data._id)
    .catch((err) =>
      console.log("Error in creating player: " + name, err.response.data)
    );

  return response;
};

const deletePlayer = (id) => {
  instance
    .delete("/players/" + id)
    .then((_) => console.log("Successfully deleted player: " + id))
    .catch((err) => console.log("Error in deleting player", err.response.data));
};

const updatePlayer = (id, payload) => {
  return instance
    .put("/players/" + id, payload)
    .then((res) => res.data)
    .catch((err) =>
      console.log(
        "Error in updating player: " + id + " with: " + payload,
        err.response.data
      )
    );
};

const transaction = ({ fromId, toId, amounts }) => {
  let verifiedAmounts = {};

  resourceArray.forEach((resource) => {
    if (amounts?.[resource]) {
      verifiedAmounts[resource] = amounts[resource];
    }
  });

  return instance
    .post("/players/transaction", { fromId, toId, amounts: verifiedAmounts })
    .then((res) => res.data)
    .catch((err) =>
      console.log("Error in performing transaction", fromId, toId, amounts)
    );
};

const bank = ({ amounts, playerId }) => {
  console.log(amounts, playerId);
  return instance
    .post("/players/bank", { playerId, amounts })
    .then((res) => res.data)
    .catch((err) => console.log("Error in performing banking"));
};

const getHistory = () => {
  return instance
    .get("/history")
    .then((res) => res.data)
    .catch((err) => console.log("Error in getting history", err));
};

const addToHistory = ({ text, type }) => {
  return instance
    .post("/history", { text, type })
    .then((res) => res.data)
    .catch((err) => console.log("Error in updating history", err));
};

const deleteHistory = () => {
  instance
    .delete("/history")
    .then((res) => res.data)
    .catch((err) => console.log("Error in deleting history", err));
};

const getEvents = () => {
  return instance
    .get("/events")
    .then((res) => res.data)
    .catch((err) => console.log("Error in getting Events", err));
};

const addToEvents = ({ name, createdBy }) => {
  return instance
    .post("/events", { name, createdBy })
    .then((res) => res.data)
    .catch((err) => console.log("Error in updating Events", err));
};

const deleteEvents = () => {
  return instance
    .delete("/events")
    .then((res) => res.data)
    .catch((err) => console.log("Error in deleting Events", err));
};

const addToRobSheet = ({ robber, innocent, robbedItem }) => {
  return instance
    .post("/rob", { values: [robber, innocent, robbedItem] })
    .then((res) => res.data)
    .catch((err) => console.log("Error in adding rob event", err));
};

const newRobSheet = () => {
  let date = new Date().toLocaleString();

  return instance
    .post("/rob", { values: ["NEW GAME", date] })
    .then((res) => res.data)
    .catch((err) => console.log("Error in adding rob event", err));
};

const api = {
  getAllPlayers,
  getPlayerByName,
  getPlayerByID,
  createPlayer,
  deletePlayer,
  updatePlayer,
  transaction,
  bank,
  getHistory,
  addToHistory,
  deleteHistory,
  getEvents,
  addToEvents,
  deleteEvents,
  addToRobSheet,
  newRobSheet,
};

export default api;
