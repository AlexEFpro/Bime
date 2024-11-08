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
