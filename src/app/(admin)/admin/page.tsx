// Admin dashboard page
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Cards for Phones, Brands, VendorPrices, Reindex */}
        <a
          href="/admin/phones"
          className="block rounded-2xl shadow-soft hover:shadow-soft-hover transition-shadow bg-card border border-border p-4"
        >
          <h2 className="text-lg font-semibold mb-2">Phones</h2>
          <p className="text-sm text-muted">Manage all phones</p>
        </a>
        <a
          href="/admin/brands"
          className="block rounded-2xl shadow-soft hover:shadow-soft-hover transition-shadow bg-card border border-border p-4"
        >
          <h2 className="text-lg font-semibold mb-2">Brands</h2>
          <p className="text-sm text-muted">Manage brands</p>
        </a>
        <a
          href="/admin/vendor-prices"
          className="block rounded-2xl shadow-soft hover:shadow-soft-hover transition-shadow bg-card border border-border p-4"
        >
          <h2 className="text-lg font-semibold mb-2">Vendor Prices</h2>
          <p className="text-sm text-muted">Manage vendor prices</p>
        </a>
        <a
          href="/admin/reindex"
          className="block rounded-2xl shadow-soft hover:shadow-soft-hover transition-shadow bg-card border border-border p-4"
        >
          <h2 className="text-lg font-semibold mb-2">Reindex</h2>
          <p className="text-sm text-muted">Push phones to Meilisearch</p>
        </a>
      </div>
    </div>
  );
}
