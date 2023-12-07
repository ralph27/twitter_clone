import React from "react";
import styles from "../../styles/button.module.css";

export default function Button({
  width,
  backgroundcolor,
  text,
  href,
  action,
}: {
  width: number;
  backgroundcolor: string;
  text: string;
  href?: string;
  action?: () => void;
}) {
  return (
    <>
      {href ? (
        <link
          href={href}
          style={{ width: width, backgroundColor: backgroundcolor }}
          onClick={action}
        >
          {text}
        </link>
      ) : (
        <button
          className={styles.button}
          style={{ width: width, backgroundColor: backgroundcolor }}
          onClick={action}
        >
          {text}
        </button>
      )}
    </>
  );
}
