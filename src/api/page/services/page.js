"use strict";

/**
 * page service
 */

const { createCoreService } = require("@strapi/strapi").factories;

require("isomorphic-fetch");
const { Client } = require("@microsoft/microsoft-graph-client");
const {
  TokenCredentialAuthenticationProvider,
} = require("@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials");
const { ClientSecretCredential } = require("@azure/identity");

const credential = new ClientSecretCredential(
  process.env.TENANT_ID,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
  scopes: ["https://graph.microsoft.com/.default"],
});

const client = Client.initWithMiddleware({
  debugLogging: true,
  authProvider,
  // Use the authProvider object to create the class.
});

module.exports = createCoreService("api::page.page", ({ strapi }) => ({
  async sendEmail(from, fromName, to, subject, html) {
    try {
      const sendMail = {
        message: {
          subject,
          body: {
            contentType: "html",
            content: html,
          },
          from: {
            emailAddress: {
              address: from,
              name: fromName,
            },
          },
          toRecipients: [
            ...to.split(",").map((email) => ({
              emailAddress: {
                address: email,
              },
            })),
          ],
        },
        saveToSentItems: "false",
      };

      await client
        .api(`/users/${process.env.INDIVIDUAL_USER_ID}/sendMail`)
        .post(sendMail);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
}));
