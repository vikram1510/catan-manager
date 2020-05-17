import { resourceArray } from "./config"

export const rob = ({ innocent }) => {

  let innocentResources = []

  resourceArray.forEach(resource => {
    const amount = innocent[resource]

    for (let i = 0; i < amount; i++) {
      innocentResources.push(resource)
    }

  })

  return innocentResources[Math.floor(Math.random() * innocentResources.length)]

}
