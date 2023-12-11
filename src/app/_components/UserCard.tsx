'use client'
import React, { useContext, useEffect, useState } from 'react'
import Button from './Button'
import { FaUser } from 'react-icons/fa'
import Image from 'next/image'
import styles from '../../styles/rightMenu.module.css'
import { UserContext } from '~/contexts/UserContext'
import { followUser, unfollowUser } from '~/util/Validation'

export default function UserCard(userCard: any) {
  const { user } = useContext(UserContext)
  const [following, setFollowing] = useState(false)

  async function handleFollow() {
    if (following && user.id) {
      await unfollowUser({
        followeeId: userCard.userCard.id,
        followerId: user.id
      })
      setFollowing(false)
    } else if (user.id && !following) {
      await followUser({
        followeeId: userCard.userCard.id,
        followerId: user.id
      })
      setFollowing(true)
    }
  }

  useEffect(() => {
    if (user.following.includes(userCard.userCard.id)) {
      setFollowing(true)
    } else {
      setFollowing(false)
    }
  }, [user])

  return (
    <div key={userCard.userCard.id} className={styles.right_menu_user}>
      <div>
        {userCard.userCard.image ? (
          <Image src={userCard.userCard.image} alt="user profile picture" />
        ) : (
          <FaUser size={25} fill="white" />
        )}
      </div>
      <p>{userCard.userCard.name}</p>
      <div>
        <Button
          text={following ? 'Unfollow' : 'Follow'}
          backgroundColor={following ? 'black' : 'white'}
          textColor={following ? 'white' : 'black'}
          size="small"
          onClick={handleFollow}
        />
      </div>
    </div>
  )
}
