"use strict";

/**
 * page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::page.page", ({ strapi }) => ({
  async sendContactEmail(ctx) {
    const {
      name,
      company,
      email,
      phone,
      service,
      message = "",
    } = ctx.request.body;

    if (!name || !company || !email || !phone || !service) {
      return ctx.badRequest("Some properties are missing");
    }

    const text = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`;
    const html = `
      <p>
        <strong> Name </strong>: ${name} <br />
        <strong> Company </strong>: ${company} <br />
        <strong> Email </strong>: ${email} <br />
        <strong> Phone </strong>: ${phone} <br />
        <strong> Service </strong>: ${service} <br />
        <strong> Message </strong>: ${message}
      </p>
    `;

    const result = await strapi
      .service("api::page.page")
      .sendEmail(
        process.env.FROM_CONTACT_EMAIL,
        process.env.TO_CONTACT_EMAIL,
        "Contact form",
        text,
        html
      );

    ctx.body = { result };
  },
}));
