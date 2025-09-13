import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="relative min-h-screen flex">
      {/* Admin sidebar */}
      <aside className="hidden md:flex md:w-64 border-r bg-muted/50 pt-safe-top pb-safe-bottom flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-2 flex-1">
          <ul className="space-y-1">
            <li>
              <a
                href="/admin"
                className="block px-3 py-2 rounded-md hover:bg-primary/10 text-primary"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/admin/phones"
                className="block px-3 py-2 rounded-md hover:bg-muted/80"
              >
                Manage Phones
              </a>
            </li>
            <li>
              <a
                href="/admin/brands"
                className="block px-3 py-2 rounded-md hover:bg-muted/80"
              >
                Manage Brands
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                className="block px-3 py-2 rounded-md hover:bg-muted/80"
              >
                Users
              </a>
            </li>
            <li>
              <a
                href="/admin/settings"
                className="block px-3 py-2 rounded-md hover:bg-muted/80"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-background pt-safe-top h-14 flex items-center px-4 md:px-6">
          <button className="md:hidden mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="font-semibold">Admin Dashboard</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
