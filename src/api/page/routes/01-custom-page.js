module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "POST",
      path: "/pages/send-contact-email",
      handler: "page.sendContactEmail",
    },
  ],
};
