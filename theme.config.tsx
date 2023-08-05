import { personalization } from "./metadata";

export default {
  footer: <p>MIT {new Date().getFullYear()} © Nextra.</p>,
  head: ({ title, meta }) => {
    return (
      <>
        <link
          rel="icon"
          href={personalization.profilePicPublicPath}
          type="image/png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {title && <meta property="og:title" content={title} />}
        {meta.description && (
          <meta property="og:description" content={meta.description} />
        )}
        {meta.tag && <meta property="og:keywords" content={meta.tag} />}
        {meta.author && <meta property="og:author" content={meta.author} />}
      </>
    );
  },
  postFooter: null,
  darkMode: true,
};
