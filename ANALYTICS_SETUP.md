# ANNICE HOME Analytics Setup

The website is ready for Google Analytics 4, Google Search Console, and Microsoft Clarity.

## Current Status

- Google Search Console verification file exists: `/google73638464a6502672.html`
- Sitemap exists: `/sitemap.xml`
- Google Analytics loader is installed in `/assets/analytics.js`
- Microsoft Clarity loader is installed in `/assets/analytics.js`
- Conversion events are tracked in `/assets/site.js`

## IDs Needed

Open `/assets/analytics.js` and replace the empty values:

```js
window.ANNICE_ANALYTICS_CONFIG = {
  googleAnalyticsId: "G-XXXXXXXXXX",
  microsoftClarityId: "xxxxxxxxxx",
};
```

## Events Tracked

- `whatsapp_click`
- `linkedin_click`
- `request_factory_price_click`
- `contact_page_click`
- `download_catalog_click`
- `inquiry_form_validation_error`
- `inquiry_form_submit_success`
- `inquiry_form_submit_error`

## Recommended Dashboards

Google Analytics 4:

- Traffic acquisition
- Pages and screens
- Events
- Countries
- Conversions

Google Search Console:

- Performance
- Indexing
- Sitemap: `https://annicehome.com/sitemap.xml`

Microsoft Clarity:

- Recordings
- Heatmaps
- Rage clicks
- Scroll depth
