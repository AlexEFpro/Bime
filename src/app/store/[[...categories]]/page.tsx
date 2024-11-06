import { ProductsWrapper } from "app/components/Store/ProductWraper";
import { getProducts, Product, ProductType } from "app/services/shopify/products";
import { fetchCollections } from "app/services/shopify/collections";


interface  CategoryProps {
    params: {
        categories: string[]
    }
    searchParams :{
      social?:string;
    }
}
async function Category(props: CategoryProps) {
  //se obtienen los productos del servicio
  const shopifyProducts : Product[] = await getProducts();
  const collections = await fetchCollections()
  console.log(collections);
  
  //adaptacion de Product a ProductType
  const products : ProductType[] =  shopifyProducts.map((product)=>({
    id: product.id,
    title: product.title,
    description: product.description,
    price: parseFloat(product.variants.edges[0]?.node.price || "0"),
    image: product.images.edges[0]?.node.originalSrc || "/placeholder-image.png",
    quantity: 1, // Asigna un valor por defecto
    handle: product.handle || "", // Asigna un valor por defecto si no está presente en el producto
    tags: "", // Asigna un valor por defecto si no está presente en el producto
  }));

    const {categories}= props.params
  return (
  <ProductsWrapper products={products}/>


  )
}

export default Category