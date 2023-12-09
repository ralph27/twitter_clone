'use server'
import { api } from '~/trpc/server'

interface IUserAuth {
  username: string
  password: string
}

export const signup = async ({ username, password }: IUserAuth) => {
  const response = await api.user.createAccount.mutate({ username, password })
  return response
}

export const login = async ({ username, password }: IUserAuth) => {
  const response = api.user.login.query({ password, username })
  return response
}
