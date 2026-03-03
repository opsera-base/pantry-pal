import { ShoppingCart, Package, AlertTriangle } from "lucide-react";
import { useGroceryStore } from "@/hooks/useGroceryStore";
import { ShoppingListItem } from "@/components/ShoppingListItem";
import { PantryItemCard } from "@/components/PantryItemCard";
import { AddItemForm } from "@/components/AddItemForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Index = () => {
  const {
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
  } = useGroceryStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-md">
        <div className="mx-auto max-w-lg px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">🛒 GroceryTrack</h1>
              <p className="text-xs text-muted-foreground">Never forget what you need</p>
            </div>
            {lowStockItems.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={addLowStockToList}
                className="text-xs border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <AlertTriangle className="mr-1 h-3 w-3" />
                {lowStockItems.length} low
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg px-4 py-4 pb-8">
        <Tabs defaultValue="shopping" className="w-full">
          <TabsList className="w-full mb-4 bg-muted">
            <TabsTrigger value="shopping" className="flex-1 data-[state=active]:bg-card data-[state=active]:shadow-card">
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Shopping
              {shoppingList.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 min-w-[20px] px-1.5 text-[10px] bg-primary text-primary-foreground">
                  {shoppingList.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pantry" className="flex-1 data-[state=active]:bg-card data-[state=active]:shadow-card">
              <Package className="mr-1.5 h-4 w-4" />
              Pantry
              {lowStockItems.length > 0 && (
                <Badge variant="secondary" className="ml-1.5 h-5 min-w-[20px] px-1.5 text-[10px] bg-accent text-accent-foreground">
                  {lowStockItems.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Shopping List */}
          <TabsContent value="shopping" className="space-y-2 mt-0">
            {shoppingList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-4 mb-3">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">Shopping list is empty</p>
                <p className="text-sm text-muted-foreground mt-1">Add items or refill from pantry</p>
              </div>
            ) : (
              <>
                {shoppingList
                  .sort((a, b) => Number(a.checked) - Number(b.checked))
                  .map((item) => (
                    <ShoppingListItem
                      key={item.id}
                      item={item}
                      onToggleCheck={toggleChecked}
                      onMarkPurchased={markPurchased}
                      onRemove={(id) => toggleShoppingList(id)}
                    />
                  ))}
                {shoppingList.some((i) => i.checked) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs text-primary border-primary/30 hover:bg-primary/10"
                    onClick={() => {
                      shoppingList.filter((i) => i.checked).forEach((i) => markPurchased(i.id));
                    }}
                  >
                    ✓ Mark all checked as purchased
                  </Button>
                )}
              </>
            )}
            <AddItemForm onAdd={addItem} toShoppingList />
          </TabsContent>

          {/* Pantry */}
          <TabsContent value="pantry" className="mt-0">
            <div className="grid grid-cols-2 gap-3">
              {pantryItems.map((item) => (
                <PantryItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(id, qty) => updateItem(id, { quantity: qty })}
                  onAddToList={toggleShoppingList}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <div className="mt-3">
              <AddItemForm onAdd={addItem} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
