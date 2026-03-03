import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { GroceryItem, CATEGORY_EMOJI, Category } from "@/types/grocery";
import { cn } from "@/lib/utils";

interface PantryItemCardProps {
  item: GroceryItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onAddToList: (id: string) => void;
  onRemove: (id: string) => void;
}

export function PantryItemCard({ item, onUpdateQuantity, onAddToList, onRemove }: PantryItemCardProps) {
  const emoji = CATEGORY_EMOJI[item.category as Category] || "📦";
  const isLow = item.quantity < item.minQuantity;

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-card p-4 shadow-card transition-all hover:shadow-lifted",
        isLow && "border-destructive/30 bg-destructive/5"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <div>
            <h3 className="font-semibold text-foreground leading-tight">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{item.category}</p>
          </div>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="rounded-md p-1 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="h-7 w-7 rounded-md border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className={cn("font-bold text-lg min-w-[3ch] text-center", isLow ? "text-destructive" : "text-foreground")}>
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="h-7 w-7 rounded-md border bg-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            <Plus className="h-3 w-3" />
          </button>
          <span className="text-xs text-muted-foreground">{item.unit}</span>
        </div>

        {isLow && (
          <button
            onClick={() => onAddToList(item.id)}
            className="flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-3 w-3" />
            Refill
          </button>
        )}
      </div>

      {isLow && (
        <p className="mt-2 text-xs text-destructive font-medium">
          Low stock — min: {item.minQuantity} {item.unit}
        </p>
      )}
    </div>
  );
}
