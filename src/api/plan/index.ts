import fetch from 'isomorphic-fetch'

const BASE_URL = process.env['API_URL'] || 'http://lvh.me:5000'
const ENDPOINT = BASE_URL + '/plans'

export const fetchPlans = async (token: string) => {
  const res = await fetch(ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'access-token': token
    },
  })

  return await res.json()
}
