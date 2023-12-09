"use client";
import styles from "../../../styles/signUp.module.css";

import React, { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //button handler should be placed here

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <form className={styles.card_content}>
            <svg
              fill="rgba(231,233,234,1.00)"
              className={styles.sign_up_logo}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
            <h1>Sign Up to X</h1>
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
            <input
              className={styles.confirm_password_input}
              placeholder="confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            ></input>
            <input className={styles.sign_up_image_upload} type="file"></input>

            {/* button component should be placed here */}
          </form>
        </div>
      </div>
    </>
  );
}
