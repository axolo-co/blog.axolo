/* eslint-disable jsx-a11y/anchor-has-content */
import Link from "next/link"
import React from "react"

const CustomLink = ({ href, children, className, "aria-label": ariaLabel, ...rest }) => {
  const isInternalLink = href && href.startsWith("/")
  const isAnchorLink = href && href.startsWith("#")

  if (isInternalLink) {
    // For Next.js 13+, we can directly pass className and other props to Link
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        <a className={className} aria-label={ariaLabel}>
          {children}
        </a>
      </Link>
    )
  }

  if (isAnchorLink) {
    return <a href={href} className={className} aria-label={ariaLabel} {...rest} />
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...rest}
    />
  )
}

export default CustomLink
