import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES, UNITS, Category, GroceryItem } from "@/types/grocery";

interface AddItemFormProps {
  onAdd: (item: Omit<GroceryItem, "id" | "checked">) => void;
  toShoppingList?: boolean;
}

export function AddItemForm({ onAdd, toShoppingList = false }: AddItemFormProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("Other");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("pcs");
  const [minQuantity, setMinQuantity] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      category,
      quantity: toShoppingList ? 0 : Number(quantity),
      unit,
      minQuantity: Number(minQuantity),
      inShoppingList: toShoppingList,
    });
    setName("");
    setQuantity("1");
    setMinQuantity("1");
    setOpen(false);
  };

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="w-full border-2 border-dashed border-border bg-transparent text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
        variant="ghost"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add item
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border-2 border-primary/20 bg-card p-4 shadow-card animate-slide-in space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">New Item</span>
        <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <Input
        placeholder="Item name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        className="bg-background"
      />
      <div className="grid grid-cols-2 gap-2">
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
          <SelectContent>
            {UNITS.map((u) => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {!toShoppingList && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Current qty</label>
            <Input type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="bg-background" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Min qty (refill at)</label>
            <Input type="number" min="0" value={minQuantity} onChange={(e) => setMinQuantity(e.target.value)} className="bg-background" />
          </div>
        </div>
      )}
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add
      </Button>
    </form>
  );
}
