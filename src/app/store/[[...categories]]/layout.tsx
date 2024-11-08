import { fetchCollections} from "app/services/shopify/collections";
import Link from "next/link";

export default async function Layout({children}:{children : React.ReactNode}) {
  const collections = await fetchCollections();
  console.log(collections);
  return (
    <main>
       <nav>
        <ul>
          {collections.map((collection)=>(
            <li key={collection.id}>
              <Link href={`/store/${collection.handle}`}>{collection.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
       {children}
    </main>
       
    
  );

}
