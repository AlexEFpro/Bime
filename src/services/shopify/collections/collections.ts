//Petición a collections
//Interfaces
export interface CollectionNode {
  id: string;
  title: string;
  handle: string;
}

export interface CollectionsResponse {
  
  collections: {
    edges: Array<{
      node: CollectionNode;
    }>;
  };
}

// Función para obtener las colecciones
export async function fetchCollections(): Promise<CollectionNode[]> {
  const query = `
    query {
      collections(first: 5) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  try {
    const collection_response = await fetch(process.env.SHOPIFY_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.TOKEN!,
      },
      body: JSON.stringify({ query }),
    });

    if (!collection_response.ok) {
      throw new Error(`Error fetching collections: ${collection_response.statusText}`);
    }

    const responseJson = await collection_response.json();

    // Verifica que la respuesta contenga la estructura esperada
    const collectionsData = responseJson.data?.collections;
    if (!collectionsData?.edges) {
      throw new Error("La estructura de respuesta de la API no es la esperada.");
    }

    // Extraemos los nodos de colección
    return collectionsData.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error en fetchCollections:", error);
    throw error;
  }
}

// collection_Products
export async function getCollectionProducts(id: string) {
  const query = `
    {
      collection(id: "${id}") {
        products(first: 250) {
          edges {
            node {
              id
              title
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const productCollectionRes = await fetch(process.env.SHOPIFY_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.TOKEN!,
      },
      body: JSON.stringify({ query }),
    });

    const json = await productCollectionRes.json();
    console.log(json);
    

    // Comprueba si el resultado contiene la estructura esperada
    if (json.data && json.data.collection && json.data.collection.products) {
      return json.data.collection.products.edges.map((edge: any) => edge.node);
    } else {
      console.error("Error: Estructura de datos inesperada", json);
      
    }
  } catch (error) {
    console.error("Error en getCollectionProducts:", error);
    
  }
}
