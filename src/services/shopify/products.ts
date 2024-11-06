// petición a shopify
export async function fetchShopify<T>(query: string, variables: { limit: number; }): Promise<T> {
  const res = await fetch(process.env.SHOPIFY_API_URL!, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.TOKEN!,
    }),
    // Enviar tanto el query como las variables
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Error fetching data: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data;  // Aquí retornamos data.data, asegurando que contenga la respuesta correcta
}

// definición de Interfaces 
interface ImageNode {
  originalSrc: string;
}

interface VariantNode {
  price: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  images: {
    edges: {
      node: ImageNode;
    }[];
  };
  variants: {
    edges: {
      node: VariantNode;
    }[];
  };
}

interface ProductsResponse {
  products: {
    edges: {
      node: Product;
    }[];
  };
}
// definicion de productType para utilizacion por categoria
export interface ProductType{
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  handle: string;
  tags: string;
}

// Función para obtención de productos
export async function getProducts(limit = 6): Promise<Product[]> {
  const query = `
    query($limit: Int!) {
      products(first: $limit) {
        edges {
          node {
            id
            title
            description
            images(first: 10) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  // Definir las variables
  const variables = {
    limit
  };

  // Obtener los datos de Shopify
  const data = await fetchShopify<ProductsResponse>(query, variables);

  // Comprobaciones para asegurar que los datos son correctos
  if (!data.products) {
    throw new Error("No se recibieron productos de Shopify.");
  }

  const products = data.products.edges.map((edge) => edge.node);

  return products;
}

