import { Check, ShoppingCart, Trash2 } from "lucide-react";
import { GroceryItem, CATEGORY_EMOJI, Category } from "@/types/grocery";
import { cn } from "@/lib/utils";

interface ShoppingListItemProps {
  item: GroceryItem;
  onToggleCheck: (id: string) => void;
  onMarkPurchased: (id: string) => void;
  onRemove: (id: string) => void;
}

export function ShoppingListItem({ item, onToggleCheck, onMarkPurchased, onRemove }: ShoppingListItemProps) {
  const emoji = CATEGORY_EMOJI[item.category as Category] || "📦";

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border bg-card p-3 shadow-card transition-all hover:shadow-lifted",
        item.checked && "opacity-60"
      )}
    >
      <button
        onClick={() => onToggleCheck(item.id)}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          item.checked
            ? "border-primary bg-primary text-primary-foreground animate-check-bounce"
            : "border-muted-foreground/30 hover:border-primary"
        )}
      >
        {item.checked && <Check className="h-3.5 w-3.5" />}
      </button>

      <span className="text-lg">{emoji}</span>

      <div className="flex-1 min-w-0">
        <span className={cn("font-medium text-foreground transition-all", item.checked && "line-through text-muted-foreground")}>
          {item.name}
        </span>
        <span className="ml-2 text-xs text-muted-foreground">{item.category}</span>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {item.checked && (
          <button
            onClick={() => onMarkPurchased(item.id)}
            className="rounded-md p-1.5 text-primary hover:bg-primary/10 transition-colors"
            title="Mark as purchased & restock"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => onRemove(item.id)}
          className="rounded-md p-1.5 text-destructive hover:bg-destructive/10 transition-colors"
          title="Remove from list"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
