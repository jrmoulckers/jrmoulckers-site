/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 * 
 */
const path = require(`path`)

// From CosmicJS setup: https://docs.cosmicjs.com/guides/#gatsby
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Get the single post layout file
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  // Query the GraphQL to get our posts from Cosmic
  const result = await graphql(
    `
      {
        allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
          edges {
            node {
              slug,
              title
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allCosmicjsPosts.edges

  // For each post in posts create a separate page
  posts.forEach((post, index) => {
    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug
      },
    })
  })
}