import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../data/site.js'

function SEO({ language, t }) {
  const isArabic = language === 'ar'
  const locale = isArabic ? 'ar_EG' : 'en_US'
  const alternateLocale = isArabic ? 'en_US' : 'ar_EG'
  const socialImage =
    typeof window === 'undefined'
      ? siteConfig.socialImage
      : new URL(siteConfig.socialImage, window.location.origin).toString()

  return (
    <Helmet
      htmlAttributes={{
        dir: isArabic ? 'rtl' : 'ltr',
        lang: language,
      }}
    >
      <title>{t.seo.title}</title>
      <meta content={t.seo.description} name="description" />
      <meta content="index, follow" name="robots" />
      <meta content="#071827" name="theme-color" />
      <meta content="Ahmed Raafat" name="author" />

      <meta content="website" property="og:type" />
      <meta content={t.seo.title} property="og:title" />
      <meta content={t.seo.description} property="og:description" />
      <meta content={locale} property="og:locale" />
      <meta content={alternateLocale} property="og:locale:alternate" />
      <meta content="Ahmed Raafat" property="og:site_name" />
      <meta content={socialImage} property="og:image" />
      <meta content="1200" property="og:image:width" />
      <meta content="630" property="og:image:height" />
      <meta content={t.seo.imageAlt} property="og:image:alt" />

      <meta content="summary_large_image" name="twitter:card" />
      <meta content={t.seo.title} name="twitter:title" />
      <meta content={t.seo.description} name="twitter:description" />
      <meta content={socialImage} name="twitter:image" />
      <meta content={t.seo.imageAlt} name="twitter:image:alt" />
    </Helmet>
  )
}

export default SEO
