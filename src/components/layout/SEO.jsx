import { Helmet } from 'react-helmet-async'

function SEO({ language, t }) {
  const isArabic = language === 'ar'
  const locale = isArabic ? 'ar_EG' : 'en_US'
  const alternateLocale = isArabic ? 'en_US' : 'ar_EG'

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

      <meta content="summary" name="twitter:card" />
      <meta content={t.seo.title} name="twitter:title" />
      <meta content={t.seo.description} name="twitter:description" />
    </Helmet>
  )
}

export default SEO
