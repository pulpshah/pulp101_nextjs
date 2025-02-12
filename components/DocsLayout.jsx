// components/DocsLayout.jsx
export default function DocsLayout({ sidebar, children, toc }) {
    return (
      <div className="flex min-h-screen bg-black text-gray-100">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:flex lg:flex-col w-64 border-r border-gray-800 p-6">
          {sidebar}
        </aside>
  
        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 max-w-2xl mx-auto">{children}</main>
  
        {/* RIGHT SIDEBAR (TOC) */}
        <aside className="hidden xl:block w-64 border-l border-gray-800 p-6">
          {toc}
        </aside>
      </div>
    );
  }
  