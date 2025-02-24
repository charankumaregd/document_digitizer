import RenderMarkdown from "@/components/RenderMarkdown";

export default function Docs() {
  return (
    <main>
      <div className="border rounded-md p-8">
        <RenderMarkdown filePath="src/markdowns/docs.md" />
      </div>
    </main>
  );
}
