export default function StructuredData({ data }) {
  if (!data) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      type="application/ld+json"
    />
  );
}
