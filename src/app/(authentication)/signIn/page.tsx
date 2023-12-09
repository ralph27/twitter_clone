"use client";

import React, { ChangeEvent, useState } from "react";
import styles from "../../../styles/signIn.module.css";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  // };

  //handle submit button should be placed here

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <form className={styles.card_content}>
            <svg
              fill="rgba(231,233,234,1.00)"
              className={styles.sign_in_logo}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
            <h1>Sign in to X</h1>
            <input
              className={styles.username_input}
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            ></input>
            <input
              className={styles.password_input}
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></input>

            {/* button component should be placed here */}
          </form>
        </div>
      </div>
    </>
  );
}
