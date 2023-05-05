"use strict";

/**
 * page service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::page.page", ({ strapi }) => ({
  async sendEmail(from, to, subject, text, html) {
    const result = await strapi.plugins["email"].services.email.send({
      to,
      from,
      subject,
      text,
      html,
    });

    return result;
  },
}));
