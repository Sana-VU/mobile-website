import { SearchBar } from "@/components/SearchBar";

export default function SearchTestPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Search Test Page</h1>
      <div className="max-w-md mx-auto">
        <SearchBar placeholder="Search phones..." />
      </div>
    </div>
  );
}
