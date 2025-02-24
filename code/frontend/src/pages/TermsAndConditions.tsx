import RenderMarkdown from "@/components/RenderMarkdown";

export default function TermsAndConditions() {
  return (
    <main>
      <div className="border rounded-md p-8">
        <RenderMarkdown filePath="src/markdowns/terms-and-conditions.md" />
      </div>
    </main>
  );
}
