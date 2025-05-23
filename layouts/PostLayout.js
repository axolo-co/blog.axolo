import Link from "@/components/Link"
import PageTitle from "@/components/PageTitle"
import SectionContainer from "@/components/SectionContainer"
import { BlogSEO } from "@/components/SEO"
import Image from "@/components/Image"
import Tag from "@/components/Tag"
import siteMetadata from "@/data/siteMetadata"
import Comments from "@/components/comments"
import ScrollTopAndComment from "@/components/ScrollTopAndComment"
import SideBannerForArticle from "@/components/sideBannerArticle"
import TOCSide from "@/components/TOCSide"
import useTranslation from "next-translate/useTranslation"
import formatDate from "@/lib/utils/formatDate"
import { useRouter } from "next/router"

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/p/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/p/${slug}`)}`

const postDateTemplate = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
  toc,
  availableLocales,
}) {
  const { slug, fileName, date, title, tags, lastmod, image: bannerImage } = frontMatter
  const { t } = useTranslation()
  const { locale } = useRouter()
  const DateSection = () => {
    if (!lastmod) {
      return (
        <div>
          <dt className="sr-only">{t("common:pub")}</dt>{" "}
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>
              <time dateTime={date}>{formatDate(new Date(date), locale)}</time>{" "}
            </time>
          </dd>
        </div>
      )
    } else {
      return (
        <div>
          <dt className="sr-only">
            Published on {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)},
            last updated{" "}
          </dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>
              {new Date(lastmod).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
          </dd>
        </div>
      )
    }
  }

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/p/${slug}`}
        authorDetails={authorDetails}
        availableLocales={availableLocales}
        {...frontMatter}
        bannerImage={bannerImage}
        images={bannerImage ? [bannerImage] : []}
        words={frontMatter?.readingTime?.words}
        tags={tags}
      />
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <DateSection />
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: "auto 1fr" }}
          >
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">{t("common:authors")}</dt>{" "}
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width="38px"
                          height="38px"
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">{t("common:name")}</dt>{" "}
                        <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace("https://x.com/", "@")}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
              {/* <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {t('common:twitter')}                
                  </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{t('common:github')}</Link>
                              </div> */}
              <Comments frontMatter={frontMatter} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {t("common:preva")}{" "}
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/p/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          {t("common:nexta")}{" "}
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/p/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="sideBannerContainer">
                <TOCSide headings={toc?.filter((t) => t.depth === 2)} />

                <SideBannerForArticle />
                <div className="pt-4 xl:pt-8">
                  <Link
                    href="/"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; {t("common:back")}{" "}
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
