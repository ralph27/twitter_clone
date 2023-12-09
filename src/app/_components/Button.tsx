'use client'
import React from 'react'
import Link from 'next/link'
import styles from '../../styles/button.module.css'

interface ButtonProps {
  size: 'small' | 'medium' | 'large'
  textColor: string
  backgroundColor: string
  onClick?: () => void
  href?: string
  text: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  size,
  textColor,
  backgroundColor,
  onClick,
  href,
  text,
  type
}) => {
  const style = {
    color: textColor,
    backgroundColor: backgroundColor
  }

  return href ? (
    <Link
      href={href}
      style={style}
      onClick={onClick}
      className={`${styles.button} ${styles[size]}`}
    >
      {text}
    </Link>
  ) : (
    <button
      onClick={onClick}
      style={style}
      className={`${styles.button} ${styles[size]}`}
    >
      {text}
    </button>
  )
}

export default Button
