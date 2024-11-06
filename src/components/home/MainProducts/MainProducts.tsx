import Image from "next/image";
import styles from './MainProducts.module.sass';
import { getProducts, Product } from "app/services/shopify/products";

interface MainProductsProps {
  searchParams?: {  // Hacer searchParams opcional
    cursor?: string; // Hacer cursor opcional
  };
}

export const MainProducts = async ({ searchParams }: MainProductsProps) => {
  //const products = await getProducts(); // Obtener todos los productos sin cursor
  const response = await fetch('http://localhost:3000/api'); //solicitud back for frontend

const{products}= await response.json()
  
  return (
    <section className={styles.MainProducts}>
      <h1>⭐️Productos mas vendidos⭐️</h1>
      <div className={styles.MainProducts__grid}>
        {products.map((product) => (
          <div key={product.id} >
            <h3>{product.title}</h3>
           
            {product.images && (
              <Image
                src={product.images.edges[0].node.originalSrc}
                alt={product.title}
                width={200}
                height={200}
                className={styles.MainProducts__image}
              />
            )}
             <p>{product.description}</p>
            {product.variants.edges.length > 0 && (
              <p>Price: ${product.variants.edges[0].node.price}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
