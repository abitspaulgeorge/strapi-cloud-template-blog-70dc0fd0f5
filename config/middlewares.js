module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "wss:", "http:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "*.strapi.io",
            "advanced-bits.s3.amazonaws.com",
            "advanced-bits-s3.b-cdn.net",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "*.strapi.io",
            "advanced-bits.s3.amazonaws.com",
            "advanced-bits-s3.b-cdn.net",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
