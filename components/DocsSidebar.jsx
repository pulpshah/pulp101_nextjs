import Link from "next/link";

export default function DocsSidebar() {
  return (
    <nav className="px-4">
      <h2 className="mb-6 text-2xl font-bold text-white">Documentation</h2>
      <ul className="space-y-4 text-base">
        <li>
          <Link
            href="/docs"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Docs Home
          </Link>
        </li>
        <li>
          <Link
            href="/docs/backend"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Backend
          </Link>
        </li>
        <li>
          <Link
            href="/docs/frontend"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Frontend
          </Link>
        </li>
        <li>
          <Link
            href="/docs/another-topic"
            className="block text-gray-400 hover:text-white transition-colors"
          >
            Another Topic
          </Link>
        </li>
      </ul>
    </nav>
  );
}
