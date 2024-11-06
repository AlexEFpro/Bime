import { getProducts } from "app/services/shopify/products";
import { NextResponse } from "next/server";

// Definimos el tipo de respuesta en caso de éxito y error
type ProductsResponse = {
  products: Awaited<ReturnType<typeof getProducts>>;
};

type ErrorResponse = {
  error: string;
};

export async function GET(): Promise<NextResponse<ProductsResponse | ErrorResponse>> {
  try {
    // Llamada para obtener productos con un límite predeterminado
    const products = await getProducts();
    
    // Devolver la respuesta JSON con los productos
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    
    // Manejar errores y devolver una respuesta JSON con el mensaje de error
    return NextResponse.json(
      { error: "Error al obtener productos de Shopify" },
      { status: 500 }
    );
  }
}
