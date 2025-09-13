import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - WhatMobile",
  description: "Admin dashboard for WhatMobile",
};

export default function AdminDashboardPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Total Phones</h2>
          <p className="text-3xl font-bold">124</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Total Brands</h2>
          <p className="text-3xl font-bold">16</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Users</h2>
          <p className="text-3xl font-bold">1,342</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Comparisons</h2>
          <p className="text-3xl font-bold">892</p>
        </div>
      </div>
    </div>
  );
}
