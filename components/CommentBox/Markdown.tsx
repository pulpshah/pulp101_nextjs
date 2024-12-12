export default function Markdown({ text }: { text: string }) {
    return <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: text }} />;
  }
  