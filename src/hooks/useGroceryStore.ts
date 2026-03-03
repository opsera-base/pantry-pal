import { useState, useCallback } from "react";
import { GroceryItem, Category } from "@/types/grocery";

const STORAGE_KEY = "grocery-tracker-items";

const loadItems = (): GroceryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultItems();
  } catch {
    return getDefaultItems();
  }
};

const saveItems = (items: GroceryItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

function getDefaultItems(): GroceryItem[] {
  return [
    { id: "1", name: "Milk", category: "Dairy & Eggs", quantity: 1, unit: "L", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "2", name: "Eggs", category: "Dairy & Eggs", quantity: 6, unit: "pcs", minQuantity: 6, inShoppingList: false, checked: false },
    { id: "3", name: "Bananas", category: "Fruits & Vegetables", quantity: 0, unit: "pcs", minQuantity: 4, inShoppingList: true, checked: false },
    { id: "4", name: "Bread", category: "Bakery", quantity: 1, unit: "pcs", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "5", name: "Rice", category: "Pantry Staples", quantity: 2, unit: "kg", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "6", name: "Chicken Breast", category: "Meat & Seafood", quantity: 0, unit: "kg", minQuantity: 1, inShoppingList: true, checked: false },
    { id: "7", name: "Olive Oil", category: "Pantry Staples", quantity: 1, unit: "bottle", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "8", name: "Tomatoes", category: "Fruits & Vegetables", quantity: 0, unit: "kg", minQuantity: 1, inShoppingList: true, checked: false },
  ];
}

export function useGroceryStore() {
  const [items, setItemsState] = useState<GroceryItem[]>(loadItems);

  const setItems = useCallback((updater: GroceryItem[] | ((prev: GroceryItem[]) => GroceryItem[])) => {
    setItemsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveItems(next);
      return next;
    });
  }, []);

  const addItem = useCallback((item: Omit<GroceryItem, "id" | "checked">) => {
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID(), checked: false }]);
  }, [setItems]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, [setItems]);

  const updateItem = useCallback((id: string, updates: Partial<GroceryItem>) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  }, [setItems]);

  const toggleShoppingList = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, inShoppingList: !i.inShoppingList, checked: false } : i))
    );
  }, [setItems]);

  const toggleChecked = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  }, [setItems]);

  const markPurchased = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, inShoppingList: false, checked: false, quantity: i.minQuantity, lastPurchased: new Date() }
          : i
      )
    );
  }, [setItems]);

  const addLowStockToList = useCallback(() => {
    setItems((prev) =>
      prev.map((i) => (i.quantity < i.minQuantity ? { ...i, inShoppingList: true } : i))
    );
  }, [setItems]);

  const shoppingList = items.filter((i) => i.inShoppingList);
  const pantryItems = items.filter((i) => !i.inShoppingList);
  const lowStockItems = items.filter((i) => i.quantity < i.minQuantity && !i.inShoppingList);

  return {
    items,
    shoppingList,
    pantryItems,
    lowStockItems,
    addItem,
    removeItem,
    updateItem,
    toggleShoppingList,
    toggleChecked,
    markPurchased,
    addLowStockToList,
  };
}
