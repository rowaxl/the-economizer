import fetch from 'isomorphic-fetch'
import { IPlan } from '../../store/reducers/plans'

const BASE_URL = process.env['NEXT_PUBLIC_API_URL'] || 'http://lvh.me:5000'
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

export const postPlan = async (token: string, plan: IPlan) => {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'access-token': token
    },
    body: JSON.stringify(plan)
  })

  return await res.json()
}