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
    query { collections(first: 5) { edges { node { id title handle } } } }
  `;

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

  const collections: CollectionsResponse = await collection_response.json();
  
  
  

  // Retorna las colecciones
  return collections
  
}
