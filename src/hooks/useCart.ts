import { useState, useCallback, useEffect } from 'react';
import type { CartItem, Plant } from '../types';

const STORAGE_KEY = 'verdana_cart_items';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Could not save cart to localStorage', err);
    }
  }, [items]);

  const addItem = useCallback((plant: Plant, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.plant.id === plant.id);
      if (existing) {
        return prev.map(i =>
          i.plant.id === plant.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { plant, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((plantId: string) => {
    setItems(prev => prev.filter(i => i.plant.id !== plantId));
  }, []);

  const updateQuantity = useCallback((plantId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.plant.id !== plantId));
    } else {
      setItems(prev =>
        prev.map(i => (i.plant.id === plantId ? { ...i, quantity } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const total = items.reduce((sum, i) => sum + i.plant.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    count,
  };
}
