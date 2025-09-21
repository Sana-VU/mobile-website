"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

interface Phone {
  id: number;
  name: string;
  slug: string;
  brand: {
    name: string;
  };
}

interface CompareContextType {
  compareList: Phone[];
  addToCompare: (phone: Phone) => void;
  removeFromCompare: (phoneId: number) => void;
  clearCompare: () => void;
  isInCompare: (phoneId: number) => boolean;
  goToCompare: () => void;
  maxCompareItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = "whatmobile_compare_list";
const MAX_COMPARE_ITEMS = 4; // Standard for phone comparisons

interface CompareProviderProps {
  children: React.ReactNode;
}

export function CompareProvider({ children }: CompareProviderProps) {
  const router = useRouter();
  const [compareList, setCompareList] = useState<Phone[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load compare list from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Phone[];
        setCompareList(parsed.slice(0, MAX_COMPARE_ITEMS)); // Ensure max limit
      }
    } catch (error) {
      console.error("Failed to load compare list:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever compareList changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareList));
      } catch (error) {
        console.error("Failed to save compare list:", error);
      }
    }
  }, [compareList, isLoaded]);

  const addToCompare = useCallback((phone: Phone) => {
    setCompareList((current) => {
      // Check if already in list
      if (current.some((p) => p.id === phone.id)) {
        return current;
      }

      // If at max capacity, remove first item
      const newList =
        current.length >= MAX_COMPARE_ITEMS ? current.slice(1) : current;

      return [...newList, phone];
    });
  }, []);

  const removeFromCompare = useCallback((phoneId: number) => {
    setCompareList((current) =>
      current.filter((phone) => phone.id !== phoneId)
    );
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  const isInCompare = useCallback(
    (phoneId: number) => {
      return compareList.some((phone) => phone.id === phoneId);
    },
    [compareList]
  );

  const goToCompare = useCallback(() => {
    if (compareList.length === 0) return;

    const ids = compareList.map((phone) => phone.id).join(",");
    router.push(`/compare?ids=${ids}`);
  }, [compareList, router]);

  const value: CompareContextType = {
    compareList,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    goToCompare,
    maxCompareItems: MAX_COMPARE_ITEMS,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}

// Floating compare bar component
export function CompareBar() {
  const { compareList, removeFromCompare, clearCompare, goToCompare } =
    useCompare();

  if (compareList.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-border rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">
            Compare Phones ({compareList.length}/{MAX_COMPARE_ITEMS})
          </h3>
          <button
            onClick={clearCompare}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Clear all
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          {compareList.map((phone) => (
            <div
              key={phone.id}
              className="relative bg-muted rounded p-2 flex-1 text-center"
            >
              <button
                onClick={() => removeFromCompare(phone.id)}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center"
              >
                ×
              </button>
              <p className="text-xs font-medium truncate">{phone.brand.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {phone.name}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={goToCompare}
          disabled={compareList.length < 2}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
        >
          Compare{" "}
          {compareList.length > 1 ? `${compareList.length} Phones` : "Phones"}
        </button>
      </div>
    </div>
  );
}
