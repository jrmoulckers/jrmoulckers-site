require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Jeffrey Moulckers`,
    description: `A portfolio site for Jeffrey Moulckers`,
    author: `@jrmoulckers`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `jrmoulckers-personal-site`,
        short_name: `JRM`,
        start_url: `/`,
        icon: `src/images/jrm_brand_logo.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
      }
    },
    {
      resolve: `gatsby-source-cosmicjs`,
      options: {
        bucketSlug: process.env.COSMIC_BUCKET_SLUG,
        objectTypes: [`pages`, `people`, `services`, `projects`, `settings`, `connects`, `skills`, `clients`, `contacts`],
        apiAccess: {
          read_key: process.env.COSMIC_READ_KEY,
        }
      }
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: `${process.env.FIREBASE_API_KEY}`,
          authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
          databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
          projectId: `${process.env.FIREBASE_PROJECT_ID}`,
          storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
          messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
          appId: `${process.env.FIREBASE_APP_ID}`,
          measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
        }
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
