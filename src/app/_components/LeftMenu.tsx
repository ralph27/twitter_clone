'use client'
import styles from '../../styles/leftMenu.module.css'
import BigLink from './BigLinks'
import { GoHomeFill, GoSearch, GoBellFill, GoChecklist } from 'react-icons/go'
import { useContext } from 'react'
import { UserContext } from '~/contexts/UserContext'
import Image from 'next/image'
import { FaUser } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default async function LeftMenu() {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()

  const handleClick = async () => {
    if (user.id) {
      setUser({ id: '', username: '', image: '' })
    } else {
      router.push('authentication/login')
    }
  }

  return (
    <main className={styles.left_menu_container}>
      <svg
        fill="rgba(231,233,234,1.00)"
        className={styles.left_menu_logo}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <g>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </g>
      </svg>
      <ul>
        <li>
          <BigLink title="Home" page="">
            <GoHomeFill size={30} fill="white" />
          </BigLink>
        </li>
        <li>
          <BigLink title="Search" page="search">
            <GoSearch size={30} fill="white" />
          </BigLink>
        </li>
        <li>
          <BigLink title="Notifications" page="notifications">
            <GoBellFill size={30} fill="white" />
          </BigLink>
        </li>
        <li>
          <BigLink title="Lists" page="lists">
            <GoChecklist size={30} fill="white" />
          </BigLink>
        </li>
      </ul>

      <div className={styles.profile_section_wrapper}>
        <p>{user.username}</p>
        {user.image ? (
          <Image src="" alt="" />
        ) : (
          <FaUser size={30} onClick={handleClick} />
        )}
      </div>
    </main>
  )
}
