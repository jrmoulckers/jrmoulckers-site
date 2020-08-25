require('dotenv').config();
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  const pageContext = {
    readKey: `${process.env.COSMIC_READ_KEY}`,
    cosmicBucket: `${process.env.COSMIC_BUCKET_SLUG}`,
  }
  if (process.env.NODE_ENV === 'production') {
    pageContext.buildhookUrl = `${process.env.BUILDHOOK_ENDPOINT}`
  }
  deletePage(page)
  createPage({
    ...page,
    context: pageContext,
  })
}

// Ensures build does not fail because of absence of browser environment for framer
exports.onCreateWebpackConfig = ({ stage, rules, loaders, actions }) => {
  switch (stage) {
    case 'build-html':
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /framer/,
              use: [loaders.null()]
            }
          ]
        }
      });
      break;
  }
};
// You can delete this file if you're not using it
