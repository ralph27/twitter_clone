'use client'
import React, { FormEvent, useContext, useState } from 'react'
import styles from '../../../styles/login.module.css'
import Button from '~/app/_components/Button'
import { login } from '~/util/Validation'
import { useRouter } from 'next/navigation'
import { UserContext } from '~/contexts/UserContext'
import Link from 'next/link'

interface IUserLogin {
  username: string
  password: string
}

export interface IUserReturned {
  username: string | null
  id: string
  image: string | null
}

export default function Page() {
  const [userForm, setUserForm] = useState<IUserLogin>({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useContext(UserContext)

  const onChange = (key: 'username' | 'password', value: string) => {
    setUserForm((prev) => ({ ...prev, [key]: value }))
  }

  const updateUserContext = (userReturned: IUserReturned) => {
    for (const attr in userReturned) {
      setUser((prev) => ({
        ...prev,
        [attr]: userReturned[attr as keyof IUserReturned]
      }))
    }
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!userForm.username || !userForm.password) {
      setError('Please enter both username and password')
      return
    }

    const { response, error } = await login({
      username: userForm.username,
      password: userForm.password
    })

    if (error) {
      setError(error)
      return
    }

    if (response) {
      updateUserContext(response)
    }
    router.push('/main')
  }

  return (
    <div className={styles.login_page_container}>
      <div className={styles.login_container}>
        <h1 className={styles.login_title}>Log In</h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <input
            placeholder="Enter Username..."
            value={userForm.username}
            onChange={(e) => onChange('username', e.target.value)}
          />
          <input
            placeholder="Enter Password..."
            value={userForm.password}
            onChange={(e) => onChange('password', e.target.value)}
            type="password"
          />
          <Link href={'/authentication/signup'} className={styles.no_account}>
            Create An Account
          </Link>
          <Button
            text="Log In"
            backgroundColor="#1DA1F2"
            size="medium"
            textColor="white"
            type="submit"
          />
        </form>
        {error && <p className={styles.login_error}>{error}</p>}
      </div>
    </div>
  )
}
