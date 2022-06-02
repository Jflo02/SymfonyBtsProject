import axios from 'axios'

import { async } from 'regenerator-runtime'
import serverAddress from '../consts/ServerAddress'

function find(id) {
  return axios
    .get(serverAddress + '/api/lits/' + id)
    .then((response) => response.data)
}

function findAll() {
  const data = axios
    .get(serverAddress + '/api/lits/')
    .then((response) => response.data['hydra:member'])
  return data
}

async function findLitsOccupe() {
  const allLits = await findAll()
  const litsOccupe = []

  allLits.forEach((lit) => {
    if (lit.sejours.length > 0) {
      //date parse permet de changer en datetime
      const dateSortieDernierSejour = Date.parse(lit.sejours.at(-1).dateSortie)
      if (
        dateSortieDernierSejour > Date.now() ||
        isNaN(dateSortieDernierSejour)
      ) {
        litsOccupe.push(lit)
      }
    }
  })

  return litsOccupe
}

async function findLitsLibre() {
  const allLits = await findAll()
  const litsOccupe = await findLitsOccupe()
  let numeroPosition = 0

  allLits.forEach((lit) => {
    litsOccupe.forEach((litOccupe) => {
      if (lit.id === litOccupe.id) {
        allLits.splice(numeroPosition, 1, 'occupé')
      }
    })
    numeroPosition = 1 + numeroPosition
  })

  const litsLibre = allLits.filter((litLibre) => litLibre !== 'occupé')

  return litsLibre
}

export default {
  find,
  findAll,
  findLitsOccupe,
  findLitsLibre,
}
