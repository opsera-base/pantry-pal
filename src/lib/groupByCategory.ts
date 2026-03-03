import { GroceryItem, CATEGORY_EMOJI, Category, CATEGORIES } from "@/types/grocery";

export function groupByCategory(items: GroceryItem[]): { category: Category; emoji: string; items: GroceryItem[] }[] {
  const groups = new Map<string, GroceryItem[]>();

  for (const item of items) {
    const existing = groups.get(item.category) || [];
    existing.push(item);
    groups.set(item.category, existing);
  }

  // Sort groups by CATEGORIES order
  return CATEGORIES
    .filter((cat) => groups.has(cat))
    .map((cat) => ({
      category: cat,
      emoji: CATEGORY_EMOJI[cat] || "📦",
      items: groups.get(cat)!,
    }));
}
