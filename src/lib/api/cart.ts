export async function addToCart(input: { productId: string; quantity: number; color?: string }) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return input;
}
