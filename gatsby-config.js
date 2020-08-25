require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Jeffrey Moulckers`,
    description: `A portfolio site for Jeffrey Moulckers`,
    author: `@jrmoulckers`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-antd`,
      options: {
        style: true
      },
    },
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
        lessOptions: {
          modifyVars: { 
            '@primary-color': '#003049',// primary color for all components
            '@link-color':'#1890ff', // link color
            '@success-color':'#52c41a', // success state color
            '@warning-color':'#faad14', // warning state color
            '@error-color': '#f5222d', // error state color
            '@font-size-base': '14px', // major text font size
            '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
            '@text-color': 'rgba(0, 0, 0, 0.65)', // major text color
            '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
            '@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
            '@border-radius-base': '2px', // major border radius
            '@border-color-base': '#d9d9d9', // major border color
            '@box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)', // major shadow for layers
          },
        },
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
