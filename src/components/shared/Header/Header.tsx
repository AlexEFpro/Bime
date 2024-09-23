import Link from "next/link"
import styles from "./Header.module.sass"
import Image from "next/image"
export const Header = ()=>{
    return (
        <header className={styles.Header}>
         
          <nav>
            <ul>
              <Link href="/"><li>Home</li></Link>
              <Link href="/store"> <li>Store</li></Link>
              <Link href="/contact"><li>Contact</li></Link>
              
            </ul>
          </nav>
        </header>
    )
}