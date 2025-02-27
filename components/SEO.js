import Head from "next/head"
import { useRouter } from "next/router"
import siteMetadata from "@/data/siteMetadata"
import React from "react"

const generateLinks = (router, availableLocales) => {
  // Each language version should be canonical for itself
  const links = []

  // Add canonical link for current locale
  const currentUrl = `${siteMetadata.siteUrl}${
    router.locale === router.defaultLocale ? "" : `/${router.locale}`
  }${router.asPath}`
  links.push(<link key="canonical" rel="canonical" href={currentUrl} />)

  // Add hreflang links only for available locales
  availableLocales.forEach((locale) => {
    const hrefLang = locale === "en" ? "en-US" : "fr-FR"
    const url = `${siteMetadata.siteUrl}${locale === router.defaultLocale ? "" : `/${locale}`}${
      router.asPath
    }`

    // Only add hreflang if this locale version exists
    links.push(<link key={`hreflang-${locale}`} rel="alternate" hrefLang={hrefLang} href={url} />)
  })

  // Add x-default hreflang link pointing to the default locale version
  const defaultUrl = `${siteMetadata.siteUrl}${router.asPath}`
  links.push(<link key="x-default" rel="alternate" hrefLang="x-default" href={defaultUrl} />)

  return links
}

// export const PageSeo = ({ title, description, availableLocales }) => {
//   const router = useRouter()
//   return (
//     <Head>
//       <title>{`${title}`}</title>
//       <meta name="robots" content="follow, index" />
//       <meta name="description" content={description} />
//       <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
//       <meta property="og:type" content="website" />
//       <meta property="og:site_name" content={siteMetadata.title[router.locale]} />
//       <meta property="og:description" content={description} />
//       <meta property="og:title" content={title} />
//       <meta property="og:image" content={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`} />
//       <meta property="og:locale" content={router.locale} />
//       {availableLocales &&
//         availableLocales
//           .filter((locale) => locale !== router.locale)
//           .map((locale) => <meta key={locale} property="og:locale:alternate" content={locale} />)}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:site" content={siteMetadata.twitter} />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       <meta name="twitter:image" content={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`} />
//       {availableLocales && generateLinks(router, availableLocales)}
//     </Head>
//   )
// }

// const CommonSEO = ({ title, description, ogType, ogImage, twImage, canonicalUrl }) => {
const CommonSEO = ({ title, description, ogType, ogImage, twImage, availableLocales }) => {
  const router = useRouter()

  // Determine canonical URL based on the same logic as generateLinks
  const canonicalLocale = availableLocales?.includes(router.defaultLocale)
    ? router.defaultLocale
    : availableLocales?.[0]
  const canonicalUrl = availableLocales
    ? `${siteMetadata.siteUrl}${
        canonicalLocale === router.defaultLocale ? "" : `/${canonicalLocale}`
      }${router.asPath}`
    : `${siteMetadata.siteUrl}${router.asPath}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      {/* <meta property="og:site_name" content={siteMetadata.title} /> */}
      <meta
        property="og:site_name"
        content={siteMetadata.title[router.locale] | "Axolo - GitHub Slack Integration blog"}
      />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {ogImage.constructor.name === "Array" ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta property="og:locale" content={router.locale} />
      {availableLocales &&
        availableLocales
          .filter((locale) => locale !== router.locale)
          .map((locale) => <meta key={locale} property="og:locale:alternate" content={locale} />)}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      {!availableLocales && <link rel="canonical" href={canonicalUrl} />}
      {availableLocales && generateLinks(router, availableLocales)}
    </Head>
  )
}

// export const PageSEO = ({ title, description }) => {
export const PageSEO = ({ title, description, availableLocales }) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
      availableLocales={availableLocales}
    />
  )
}

// export const TagSEO = ({ title, description }) => {
export const TagSEO = ({ title, description, availableLocales }) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
        availableLocales={availableLocales}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({
  authorDetails,
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
  // canonicalUrl,
  availableLocales,
  bannerImage,
  words,
  tags,
}) => {
  const router = useRouter()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  let imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === "string"
      ? [images]
      : images

  const featuredImages = imagesArr.map((img) => {
    return {
      "@type": "ImageObject",
      url: `${siteMetadata.siteUrl}${img}`.replace("blog/blog", "blog"),
    }
  })

  const metaTitle = `${title} | Axolo Blog`

  let authorList
  if (authorDetails) {
    authorList = authorDetails.map((author) => {
      return {
        "@type": "Person",
        name: author.name,
      }
    })
  } else {
    authorList = {
      "@type": "Person",
      name: siteMetadata.author,
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: metaTitle,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      "@type": "Organization",
      name: siteMetadata.author,
      logo: {
        "@type": "ImageObject",
        url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: summary,

    // todo check working
    additionalMetaTags: [
      {
        name: "author",
        content: siteMetadata.author,
      },
      { name: "slack-app-id", content: "A01RP0R62N7" },
      { name: "twitter:label1", content: "About" },
      { name: "twitter:data1", content: "axolo.co" },
      { name: "twitter:label2", content: "Documentation" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@axolo_co" },
      { name: "twitter:creator", content: "@axolo_co" },
    ],
  }

  if (words) {
    structuredData.wordCount = words
  }

  if (tags && tags.length > 0) {
    structuredData.keywords = tags.join(", ").replace(/-/g, " ")
  }

  // metadata image for twitter here
  const twImageUrl = `${siteMetadata.siteUrl}${bannerImage?.slice(5)}`

  return (
    <>
      <CommonSEO
        title={metaTitle}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
        availableLocales={availableLocales}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        {availableLocales && generateLinks(router, availableLocales)}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
