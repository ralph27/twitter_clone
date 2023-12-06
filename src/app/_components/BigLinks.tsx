import Link from "next/link";
import styles from "../../styles/bigLink.module.css"

export default async function BigLink({title, page, children} : {title: string, page: string, children: React.ReactNode}) {
  return (
      <Link className={styles.big_link_wrapper} href={`/${page}`}>
        {children}
        <h1>{title}</h1>
      </Link>
  );
}