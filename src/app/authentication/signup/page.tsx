'use client'
import React, { FormEvent, useState } from 'react'
import Button from '~/app/_components/Button'
import styles from '../../../styles/signup.module.css'
import { useRouter } from 'next/navigation'
import { signup } from '~/util/Validation'
import { IUserReturned } from '../login/page'
import Link from 'next/link'

export interface IUserSignup {
  username: string
  password: string
  confirmPassword: string
}

export default function Signup() {
  const [user, setUser] = useState<IUserSignup>({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const onChange = (
    key: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => {
    setUser((prev) => ({ ...prev, [key]: value }))
  }

  const updateUserContext = (userReturned: IUserReturned) => {
    for (const attr in userReturned) {
      setUser((prev) => ({
        ...prev,
        [attr]: userReturned[attr as keyof IUserReturned]
      }))
    }
  }

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    if (!user.username || !user.password || !user.confirmPassword) {
      setError('Fill All Fields')
      return
    }

    if (user.password !== user.confirmPassword) {
      setError('Passwords Do Not Match')
      return
    }

    if (user.password.length < 8) {
      setError('Password Too Short')
      return
    }

    const { response, error } = await signup({
      username: user.username,
      password: user.password
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
    <div className={styles.signup_page_container}>
      <div className={styles.signup_container}>
        <h1 className={styles.signup_title}>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <input
            placeholder="Enter Username..."
            value={user.username}
            onChange={(e) => onChange('username', e.target.value)}
          />
          <input
            placeholder="Enter Password..."
            value={user.password}
            onChange={(e) => onChange('password', e.target.value)}
          />
          <input
            placeholder="Confirm Password..."
            value={user.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
          />
          <Link href="/authentication/login" className={styles.no_account}>
            Already Have An Account?
          </Link>
          <Button
            text="Sign Up"
            backgroundColor="#1DA1F2"
            size="medium"
            textColor="white"
            type="submit"
          />
        </form>
        {error && <p className={styles.signup_error}>{error}</p>}
      </div>
    </div>
  )
}
