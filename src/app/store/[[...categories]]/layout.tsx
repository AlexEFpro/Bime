import { fetchCollections} from "app/services/shopify/collections";
import Link from "next/link";

export default async function Layout({children}:{children : React.ReactNode}) {
  const arrayData = await fetchCollections()
  
  

  console.log(arrayData);
  return (
    <main>
       <nav>
       </nav>
       {children}
    </main>
       
    
  )

}
