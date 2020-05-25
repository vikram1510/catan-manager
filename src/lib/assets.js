const { PUBLIC_URL } = process.env

const RESOURCE_FOLDER = PUBLIC_URL + '/resource/'
const HARBOUR_FOLDER = PUBLIC_URL + '/harbour/'

const assets = {
  brick: RESOURCE_FOLDER + '/NewBricksCatan.png',
  sheep: RESOURCE_FOLDER + '/NewSheepCatan.png',
  wood: RESOURCE_FOLDER + '/NewTreeCatan.png',
  grain: RESOURCE_FOLDER + '/NewWheatCatan.png',
  rock: RESOURCE_FOLDER + '/NewRocksCatan.png',
  bg: PUBLIC_URL + '/bg.jpg',
  logo: PUBLIC_URL + '/catanlogo.png',
}

export const harborAssets = {
  brick: HARBOUR_FOLDER + '/harbour_brick.png',
  sheep: HARBOUR_FOLDER + '/harbour_sheep.png',
  wood: HARBOUR_FOLDER + '/harbour_wood.png',
  grain: HARBOUR_FOLDER + '/harbour_grain.png',
  rock: HARBOUR_FOLDER + '/harbour_rock.png',
  "any-3": HARBOUR_FOLDER + '/harbour_any-3.png',
  "any-4": HARBOUR_FOLDER + '/harbour_any-4.png',
}

export default assets
