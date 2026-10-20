export type Availability = "in_stock" | "on_request";

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryPath: string[];
  summary: string;
  description: string;
  price: number;
  images: string[];
  availability: Availability;
  stockCount?: number;
  sourcingEta?: string;
  colors: { name: string; hex: string }[];
  features: string[];
  specs: Record<string, string>;
}
