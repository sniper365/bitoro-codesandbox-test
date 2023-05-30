import * as React from 'react'
/**
 * Constants & Helpers
 */
export const WEBSITE_HOST_URL = 'https://bitoro-perp.vercel.app/'

/**
 * Prop Types
 */
export interface MetaProps {
  description?: string
  image?: string
  title: string
  type?: string
}

/**
 * Component
 */
export const Head = ({
  customMeta,
}: {
  customMeta?: MetaProps
}): JSX.Element => {
  const meta: MetaProps = {
    title: 'Bitoro Perpetual',
    description: 'Bitoro Perpetual',
    image: `${WEBSITE_HOST_URL}/images/site-preview.png`,
    type: 'website',
    ...customMeta,
  }

  return (
    <head>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${WEBSITE_HOST_URL}`} />
      <link rel="canonical" href={`${WEBSITE_HOST_URL}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Bitor Perpetual" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@huntarosan" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
    </head>
  )
}
