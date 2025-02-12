export default function DocsTOC() {
    return (
      <div>
        <h3 className="mb-3 text-md font-semibold text-white">On this page</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#backend-documentation-overview" className="hover:underline">
              Overview
            </a>
          </li>
          <li>
            <a href="#sections" className="hover:underline">
              Sections
            </a>
          </li>
          {/* You can extend this with more anchors if your MDX pages have additional headings */}
        </ul>
      </div>
    );
  }
  