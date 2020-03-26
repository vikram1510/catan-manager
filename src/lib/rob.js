import { resourceArray } from "./config"

export const rob = ({robber, innocent}) => {
console.log(robber, innocent)

let innocentResources = []

resourceArray.forEach(resource => {
  const amount = innocent[resource]

  for (let i = 0; i < amount; i++) {
    innocentResources.push(resource)
  }

})

const resourceToRob = innocentResources[Math.floor(Math.random() * innocentResources.length)]


robber[resourceToRob] += 1
innocent[resourceToRob] -= 1
console.log(robber,innocent)
return {newRobber: robber, newInnocent: innocent, robbedItem: resourceToRob}
}


