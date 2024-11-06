import { ProductCard } from "../ProductCard"
import styles from './ProductsWraper.module.sass'
import { ProductType } from "app/services/shopify/products"

interface ProductsWrapperProps {
    products: ProductType[]
}

export const ProductsWrapper = ({ products }: ProductsWrapperProps) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}