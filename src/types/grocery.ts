export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minQuantity: number;
  inShoppingList: boolean;
  checked: boolean;
  lastPurchased?: Date;
}

export type Category = 
  | "Fruits & Vegetables"
  | "Dairy & Eggs"
  | "Meat & Seafood"
  | "Bakery"
  | "Pantry Staples"
  | "Beverages"
  | "Snacks"
  | "Frozen"
  | "Household"
  | "Other";

export const CATEGORIES: Category[] = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Bakery",
  "Pantry Staples",
  "Beverages",
  "Snacks",
  "Frozen",
  "Household",
  "Other",
];

export const CATEGORY_EMOJI: Record<Category, string> = {
  "Fruits & Vegetables": "🥬",
  "Dairy & Eggs": "🥛",
  "Meat & Seafood": "🥩",
  "Bakery": "🍞",
  "Pantry Staples": "🫙",
  "Beverages": "☕",
  "Snacks": "🍿",
  "Frozen": "🧊",
  "Household": "🧹",
  "Other": "📦",
};

export const UNITS = ["pcs", "kg", "g", "L", "ml", "dozen", "pack", "bottle", "can", "bag"];
