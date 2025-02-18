import DocsBreadcrumb from "@/components/docs-breadcrumb";
import Pagination from "@/components/pagination";
import Toc from "@/components/toc";
import { page_routes } from "@/lib/routes-config";
import { notFound } from "next/navigation";
import { getDocsForSlug } from "@/lib/markdown";
import { Typography } from "@/components/typography";

type PageProps = {
  params: { slug: string[] };
};

export default async function DocsPage({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);

  if (!res) {
    notFound();
  }

  const { frontmatter, content } = res;

  return (
    <div className="flex items-start gap-10">
      <div className="flex-[4.5] pt-10">
        <DocsBreadcrumb paths={slug} />

        <Typography>
          {/* Title & Description */}
          <h1 className="text-3xl -mt-2">{frontmatter.title}</h1>
          <p className="-mt-4 text-muted-foreground text-[16.5px]">
            {frontmatter.description}
          </p>

          {/* Render the actual MDX content */}
          <article className="prose prose-invert mt-6">{content}</article>

          <Pagination pathname={pathName} />
        </Typography>
      </div>

      {/* Table of Contents on the side */}
      <Toc path={pathName} />
    </div>
  );
}

// Generate <title> and <meta> description tags
export async function generateMetadata({ params: { slug = [] } }: PageProps) {
  const pathName = slug.join("/");
  const res = await getDocsForSlug(pathName);
  if (!res) return null;

  const { frontmatter } = res;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

// For static export (if using SSG)
export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split("/").slice(1),
  }));
}
