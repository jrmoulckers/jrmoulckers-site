import React from "react"
import { Link, graphql } from "gatsby"

const BlogIndex = ({ data }) => {
  const posts = data.allCosmicjsPosts.edges // getting all posts from query

  // Rendering list of posts with link to their url
  return (
    <div>
      {posts.map(({ node }) => {
        return (
          <div key={node.slug}>
            <Link to={node.slug}>
              <h3>{node.title}</h3>
              <img alt="" src={`${node?.metadata?.hero?.imgix_url}?w=400`}/>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default BlogIndex

// Query all posts from GraphQL
export const pageQuery = graphql`
  query {
    allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
      edges {
        node {
          slug
          title
          metadata {
            hero {
              imgix_url
            }
          }
          created(formatString: "DD MMMM, YYYY")
        }
      }
    }
  }
`









// import React from "react"
// import { Link } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

// const IndexPage = () => (
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link> <br />
//     <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
//   </Layout>
// )

// export default IndexPage
