const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Cosmic Flow",
  description:
    "An interactive journey through the Solar System — from the Sun to Mars and humanity's next frontier.",
  inLanguage: "en-US",
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
