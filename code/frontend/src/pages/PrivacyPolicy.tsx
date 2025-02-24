import RenderMarkdown from "@/components/RenderMarkdown";

export default function PrivacyPolicy() {
  return (
    <main>
      <div className="border rounded-md p-8">
        <RenderMarkdown filePath="src/markdowns/privacy-policy.md" />
      </div>
    </main>
  );
}
