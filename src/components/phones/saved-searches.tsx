"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, Clock, Trash2, BookmarkPlus, Search } from "lucide-react";
import { useSavedSearches } from "@/hooks/use-saved-searches";
import { cn } from "@/lib/utils";

interface SavedSearchesProps {
  totalResults?: number;
  className?: string;
}

export function SavedSearches({ totalResults, className }: SavedSearchesProps) {
  const router = useRouter();
  const {
    savedSearches,
    isLoading,
    saveCurrentSearch,
    loadSearch,
    deleteSearch,
    clearAllSearches,
    getCurrentFilters,
    getCurrentSearchMatch,
    getFilterSummary,
  } = useSavedSearches();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [saveError, setSaveError] = useState("");

  const currentFilters = getCurrentFilters();
  const hasActiveFilters =
    Object.keys(currentFilters).filter((k) => k !== "page").length > 0;
  const currentMatch = getCurrentSearchMatch();

  const handleSaveSearch = async () => {
    setSaveError("");

    if (!searchName.trim()) {
      setSaveError("Please enter a name for your search");
      return;
    }

    try {
      await saveCurrentSearch(searchName, totalResults);
      setSearchName("");
      setSaveDialogOpen(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to save search"
      );
    }
  };

  const handleLoadSearch = (searchId: string) => {
    try {
      const url = loadSearch(searchId);
      router.push(url);
    } catch (error) {
      console.error("Failed to load search:", error);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - timestamp;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const SaveButton = () => (
    <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasActiveFilters}
          className={cn(
            "gap-2 transition-colors",
            currentMatch &&
              "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
            className
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              currentMatch && "fill-red-500 text-red-500"
            )}
          />
          {currentMatch ? "Saved" : "Save Search"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookmarkPlus className="h-5 w-5" />
            Save Current Search
          </DialogTitle>
          <DialogDescription>
            Save your current filters to quickly access them later.
            {totalResults && ` This search has ${totalResults} results.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-name">Search Name</Label>
            <Input
              id="search-name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="e.g. Budget 5G phones"
              className="w-full"
            />
            {saveError && <p className="text-sm text-red-600">{saveError}</p>}
          </div>

          <div className="rounded-lg bg-muted p-3">
            <h4 className="text-sm font-medium mb-2">Current Filters:</h4>
            <p className="text-sm text-muted-foreground">
              {getFilterSummary(currentFilters)}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveSearch} disabled={!searchName.trim()}>
            <BookmarkPlus className="h-4 w-4 mr-2" />
            Save Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex items-center gap-2">
      <SaveButton />

      {savedSearches.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Clock className="h-4 w-4" />
              Saved ({savedSearches.length})
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Saved Searches
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Loading...
              </div>
            ) : (
              <>
                {savedSearches.map((search) => (
                  <DropdownMenuItem
                    key={search.id}
                    className="flex flex-col items-start p-3 cursor-pointer"
                    onClick={() => handleLoadSearch(search.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">{search.name}</span>
                      <div className="flex items-center gap-1">
                        {search.count && (
                          <Badge variant="secondary" className="text-xs">
                            {search.count}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-red-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSearch(search.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {getFilterSummary(search.filters)}
                    </p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatTimestamp(search.timestamp)}
                    </span>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={clearAllSearches}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Searches
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
