import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { BsFillClipboard2PlusFill } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'
import styles from '../../../styles/list.module.css'
import Image from 'next/image'

export default function Page() {
  return (
    <div className={styles.list_container}>
      <div className={styles.list_container_upper}>
        <FaArrowLeft size={20} />
        <BsFillClipboard2PlusFill size={20} />
      </div>

      <p className={styles.list_container_title}>Your Lists</p>
      <div className={styles.list_wrapper}>
        <div style={{ display: 'flex', gap: 10 }}>
          <Image
            src="https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=240x240"
            alt=""
            width={40}
            height={40}
            style={{ borderRadius: 10 }}
          />
          <div>
            <p>Name</p>
            <p>33 members</p>
          </div>
        </div>

        <MdDeleteForever size={25} />
      </div>
    </div>
  )
}
