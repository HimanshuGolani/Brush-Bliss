import { useEffect, useMemo, useState } from "react";
import { CartContext } from "./CartContext";
import { parsePrice } from "../lib/pricing";

const STORAGE_KEY = "brushandbliss-cart";

export default function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage may be unavailable (private mode, etc.)
    }
  }, [items]);

  const add = (item) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id, next) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, next) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const grandTotal = useMemo(
    () => items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        updateQuantity,
        clear,
        totalItems,
        grandTotal,
        isEmpty: items.length === 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
