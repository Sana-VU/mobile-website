// Reindex page (push phones to Meilisearch)
export default function AdminReindexPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reindex Phones</h1>
      <div className="rounded-2xl shadow-soft bg-card border border-border p-4">
        <button className="px-4 py-2 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft transition hover:shadow-soft-hover">
          Reindex Now
        </button>
        <p className="text-muted mt-4">
          Push all phones to Meilisearch for instant search updates.
        </p>
      </div>
    </div>
  );
}
