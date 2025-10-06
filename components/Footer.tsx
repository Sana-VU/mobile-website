import Link from "next/link";

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/companies", label: "Companies" }
  ],
  Resources: [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/blog", label: "Insights" },
    { href: "/rss.xml", label: "RSS" }
  ],
  Legal: [
    { href: "#", label: "Terms" },
    { href: "#", label: "Privacy" }
  ],
  Social: [
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://linkedin.com", label: "LinkedIn" }
  ]
} as const;

export function Footer() {
  return (
    <footer className="border-t border-slate-200/10 bg-slate-900 text-slate-100 dark:border-slate-800">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="font-heading text-sm uppercase tracking-wide text-slate-300">{title}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-400 transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800/50 px-6 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} PakJobs. We link to original sources. For removals, contact us.
      </div>
    </footer>
  );
}
