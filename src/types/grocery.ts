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
  | "Rice & Millets"
  | "Dals & Lentils"
  | "Vegetables"
  | "Fruits"
  | "Dairy"
  | "Spices & Masala"
  | "Oil & Ghee"
  | "Coconut & Chutneys"
  | "Flours & Grains"
  | "Snacks & Sweets"
  | "Beverages"
  | "Household"
  | "Other";

export const CATEGORIES: Category[] = [
  "Rice & Millets",
  "Dals & Lentils",
  "Vegetables",
  "Fruits",
  "Dairy",
  "Spices & Masala",
  "Oil & Ghee",
  "Coconut & Chutneys",
  "Flours & Grains",
  "Snacks & Sweets",
  "Beverages",
  "Household",
  "Other",
];

export const CATEGORY_EMOJI: Record<Category, string> = {
  "Rice & Millets": "🍚",
  "Dals & Lentils": "🫘",
  "Vegetables": "🥬",
  "Fruits": "🍌",
  "Dairy": "🥛",
  "Spices & Masala": "🌶️",
  "Oil & Ghee": "🫒",
  "Coconut & Chutneys": "🥥",
  "Flours & Grains": "🌾",
  "Snacks & Sweets": "🍿",
  "Beverages": "☕",
  "Household": "🧹",
  "Other": "📦",
};

export const UNITS = ["kg", "g", "L", "ml", "pcs", "dozen", "pack", "bottle", "bundle", "bag"];
