window.ANNICE_ANALYTICS_CONFIG = {
  googleAnalyticsId: "",
  microsoftClarityId: "",
};

const analyticsConfig = window.ANNICE_ANALYTICS_CONFIG;
const hasGoogleAnalytics = /^G-[A-Z0-9]+$/.test(analyticsConfig.googleAnalyticsId);
const hasMicrosoftClarity = /^[a-z0-9]+$/i.test(analyticsConfig.microsoftClarityId);

if (hasGoogleAnalytics) {
  const gaScript = document.createElement("script");
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", analyticsConfig.googleAnalyticsId, {
    page_title: document.title,
    page_location: window.location.href,
  });
}

if (hasMicrosoftClarity) {
  (function loadClarity(c, l, a, r, i, t, y) {
    c[a] = c[a] || function clarity() {
      (c[a].q = c[a].q || []).push(arguments);
    };
    t = l.createElement(r);
    t.async = true;
    t.src = `https://www.clarity.ms/tag/${i}`;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", analyticsConfig.microsoftClarityId);
}

window.anniceTrack = function anniceTrack(eventName, params = {}) {
  const payload = {
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  };

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }

  if (typeof window.clarity === "function") {
    window.clarity("event", eventName);
  }
};
