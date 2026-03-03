import { useState, useCallback } from "react";
import { GroceryItem } from "@/types/grocery";

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
    // Rice & Millets
    { id: "1", name: "Ponni Raw Rice", category: "Rice & Millets", quantity: 5, unit: "kg", minQuantity: 3, inShoppingList: false, checked: false },
    { id: "2", name: "Idli Rice", category: "Rice & Millets", quantity: 2, unit: "kg", minQuantity: 2, inShoppingList: false, checked: false },
    { id: "3", name: "Ragi Flour", category: "Rice & Millets", quantity: 1, unit: "kg", minQuantity: 1, inShoppingList: false, checked: false },

    // Dals & Lentils
    { id: "4", name: "Toor Dal", category: "Dals & Lentils", quantity: 1, unit: "kg", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "5", name: "Urad Dal (whole)", category: "Dals & Lentils", quantity: 1, unit: "kg", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "6", name: "Moong Dal", category: "Dals & Lentils", quantity: 0, unit: "kg", minQuantity: 1, inShoppingList: true, checked: false },
    { id: "7", name: "Chana Dal", category: "Dals & Lentils", quantity: 1, unit: "kg", minQuantity: 1, inShoppingList: false, checked: false },

    // Vegetables
    { id: "8", name: "Drumstick", category: "Vegetables", quantity: 0, unit: "bundle", minQuantity: 1, inShoppingList: true, checked: false },
    { id: "9", name: "Curry Leaves", category: "Vegetables", quantity: 1, unit: "bundle", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "10", name: "Tomatoes", category: "Vegetables", quantity: 0, unit: "kg", minQuantity: 1, inShoppingList: true, checked: false },
    { id: "11", name: "Onions", category: "Vegetables", quantity: 2, unit: "kg", minQuantity: 2, inShoppingList: false, checked: false },
    { id: "12", name: "Green Chillies", category: "Vegetables", quantity: 100, unit: "g", minQuantity: 100, inShoppingList: false, checked: false },
    { id: "13", name: "Brinjal", category: "Vegetables", quantity: 0, unit: "kg", minQuantity: 1, inShoppingList: true, checked: false },

    // Dairy
    { id: "14", name: "Milk", category: "Dairy", quantity: 2, unit: "L", minQuantity: 2, inShoppingList: false, checked: false },
    { id: "15", name: "Curd", category: "Dairy", quantity: 1, unit: "kg", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "16", name: "Paneer", category: "Dairy", quantity: 0, unit: "pcs", minQuantity: 1, inShoppingList: true, checked: false },

    // Spices & Masala
    { id: "17", name: "Mustard Seeds", category: "Spices & Masala", quantity: 200, unit: "g", minQuantity: 100, inShoppingList: false, checked: false },
    { id: "18", name: "Turmeric Powder", category: "Spices & Masala", quantity: 100, unit: "g", minQuantity: 100, inShoppingList: false, checked: false },
    { id: "19", name: "Sambar Powder", category: "Spices & Masala", quantity: 0, unit: "g", minQuantity: 200, inShoppingList: true, checked: false },
    { id: "20", name: "Rasam Powder", category: "Spices & Masala", quantity: 100, unit: "g", minQuantity: 100, inShoppingList: false, checked: false },

    // Oil & Ghee
    { id: "21", name: "Gingelly Oil", category: "Oil & Ghee", quantity: 1, unit: "L", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "22", name: "Ghee", category: "Oil & Ghee", quantity: 500, unit: "ml", minQuantity: 500, inShoppingList: false, checked: false },
    { id: "23", name: "Coconut Oil", category: "Oil & Ghee", quantity: 1, unit: "L", minQuantity: 1, inShoppingList: false, checked: false },

    // Coconut & Chutneys
    { id: "24", name: "Fresh Coconut", category: "Coconut & Chutneys", quantity: 2, unit: "pcs", minQuantity: 2, inShoppingList: false, checked: false },
    { id: "25", name: "Coconut Chutney Powder", category: "Coconut & Chutneys", quantity: 0, unit: "g", minQuantity: 200, inShoppingList: true, checked: false },
    { id: "26", name: "Tamarind", category: "Coconut & Chutneys", quantity: 200, unit: "g", minQuantity: 200, inShoppingList: false, checked: false },

    // Flours
    { id: "27", name: "Rava (Sooji)", category: "Flours & Grains", quantity: 1, unit: "kg", minQuantity: 1, inShoppingList: false, checked: false },
    { id: "28", name: "Wheat Flour (Atta)", category: "Flours & Grains", quantity: 2, unit: "kg", minQuantity: 2, inShoppingList: false, checked: false },

    // Beverages
    { id: "29", name: "Filter Coffee Powder", category: "Beverages", quantity: 200, unit: "g", minQuantity: 200, inShoppingList: false, checked: false },
    { id: "30", name: "Tea Powder", category: "Beverages", quantity: 100, unit: "g", minQuantity: 100, inShoppingList: false, checked: false },

    // Fruits
    { id: "31", name: "Bananas", category: "Fruits", quantity: 0, unit: "dozen", minQuantity: 1, inShoppingList: true, checked: false },
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
