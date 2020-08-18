import React from "react"
import { graphql } from "gatsby"

const BlogPostTemplate = ({ data }) => {
  const post = data.cosmicjsPosts // get the post data from query

  // Render the post data  
  return (
    <article>
      <h1>{post.title}</h1>
      <small>{post.created}</small>
      <div><img alt="" src={`${post.metadata.hero.imgix_url}?w=400`}/></div>
      <section dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}

export default BlogPostTemplate

// Query to get single Post where slug is equal
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    cosmicjsPosts(slug: { eq: $slug }) {
      id
      content
      title
      metadata {
        hero {
          imgix_url
        }
      }
      created(formatString: "MMMM DD, YYYY")
    }
  }
`