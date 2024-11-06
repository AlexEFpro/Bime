//Peticion a collections
//Interfaces
export interface CollectionNode {
    id: string;
    title: string;
    handle: string;
    description: string;
  }
  
  interface CollectionsResponse {
    collections: {
      edges: {
        node: CollectionNode;
      }[];
    };
  }
  //
  export async function fetchCollections(): Promise<CollectionNode[]> {
    const query = `
      query {
        collections(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
            }
          }
        }
      }
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
  
    const data: CollectionsResponse = await collection_response.json();
    if (!data.collections || !data.collections.edges) {
        throw  Error("No se recibieron colecciones de Shopify.");
      }
    
    return data.collections.edges.map(edge => edge.node);
  }
  
  