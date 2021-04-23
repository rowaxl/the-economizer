import { internet } from 'faker'
import jwt from 'jsonwebtoken'
import { IUser } from '../store/reducers/auth'
import { IRecord } from '../store/reducers/plans'

const cert = process.env.AUTH_SECRET ||  'AUTH_SECRET'

export const encodeUserToken = (user: IUser) => {
  return jwt.sign({
    email: user.email,
    name: user.name,
    image: user.image,
    exp: Math.floor(Date.now() / 1000) + (24*60*60)
  }, cert, {algorithm: 'HS256'})
}

export const calcPercentage = (records: IRecord[]) => {
  const expences = records.filter(r => r.amount < 0)
  const incomes = records.filter(r => r.amount > 0)

  const expenceAmount = expences.reduce((a, c) => a + c.amount, 0)
  const incomeAmount = incomes.reduce((a, c) => a + c.amount, 0)

  const diff = incomeAmount + expenceAmount
  // const percentage = isNaN(diff / (incomeAmount - expenceAmount)) ? 0 : diff / (incomeAmount - expenceAmount)

  return [diff]
}

export const CATEGORIES = [
  { label: 'Housing', icon: '🏠' },
  { label: 'Transportation', icon: '🚌' },
  { label: 'Grocery', icon: '🍖' },
  { label: 'Utilities', icon: '📐' },
  { label: 'Medical & Healthcare', icon: '🏥' },
  { label: 'Tax & Insurance', icon: '📜' },
  { label: 'Saving', icon: '💰' },
  { label: 'Education', icon: '📚' },
  { label: 'Entertainment', icon: '🏀' },
  { label: 'Income', icon: '💵' },
  { label: 'Uncategorised', icon: '❓' },
]

export const CATEGORY_COLOR_MAP = {
  'Housing': internet.color(),
  'Transportation': internet.color(),
  'Grocery': internet.color(),
  'Utilities': internet.color(),
  'Medical & Healthcare': internet.color(),
  'Tax & Insurance': internet.color(),
  'Saving': internet.color(),
  'Education': internet.color(),
  'Entertainment': internet.color(),
  'Income': internet.color(),
  'Uncategorised': internet.color(),
}