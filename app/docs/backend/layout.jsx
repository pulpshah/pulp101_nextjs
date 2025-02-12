import DocsLayout from "@/components/DocsLayout";
import DocsSidebar from "@/components/DocsSidebar";
import DocsTOC from "@/components/DocsTOC";

export const metadata = {
  title: "Backend Documentation",
};

export default function BackendLayout({ children }) {
  return (
    <DocsLayout sidebar={<DocsSidebar />} toc={<DocsTOC />}>
      {children}
    </DocsLayout>
  );
}
