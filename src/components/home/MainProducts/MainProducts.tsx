'use client'
import styles from './MainProducts.module.sass'
console.log("env",process.env.SHOPIFY_HOSTNAME);

export const MainProducts = ()=>{
    return(
        <section className={styles.MainProducts} >
            <h1>Main Products</h1>

        </section>
    
    )
}