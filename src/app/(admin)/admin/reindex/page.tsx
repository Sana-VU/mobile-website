import { ReindexButton } from "../reindex-button";

// Reindex page (push phones to search index)
export default function AdminReindexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Search Index Management</h1>
      <div className="space-y-6">
        <div className="rounded-2xl shadow-soft bg-card border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Rebuild Search Index</h2>
          <p className="text-muted mb-6">
            Rebuild the phone search index to ensure search results are
            up-to-date with the latest phone data from the database.
          </p>

          <ReindexButton />
        </div>

        <div className="rounded-2xl shadow-soft bg-card border border-border p-6">
          <h3 className="text-lg font-semibold mb-3">
            What happens during reindexing:
          </h3>
          <ul className="text-muted space-y-2">
            <li>• Fetches all phones from the database</li>
            <li>• Includes brand information and pricing data</li>
            <li>• Creates optimized searchable text for each phone</li>
            <li>• Updates the in-memory search index for instant results</li>
          </ul>
        </div>

        <div className="rounded-2xl shadow-soft bg-amber-50 border border-amber-200 p-6">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">
            When to reindex:
          </h3>
          <ul className="text-amber-700 space-y-2">
            <li>• After adding new phones to the database</li>
            <li>• After updating phone specifications or pricing</li>
            <li>• After changing brand names or information</li>
            <li>• If search results seem outdated or incomplete</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
