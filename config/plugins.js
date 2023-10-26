module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: env("CDN_URL"),
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          params: {
            ACL: env("AWS_ACL", "public-read"),
            Bucket: env("AWS_BUCKET"),
          },
        },
      },
    },
  },
  "record-locking": {
    enabled: true,
  },
});
