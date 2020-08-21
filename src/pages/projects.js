/** 
 * This will be our projects section that will take project data 
 * and display information about each project.  
 * This will take a prop composed of our portfolio projects and 
 * iterate over them to display data when appropriate. 
 */
import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import { Modal } from 'rsuite'
import Imgix from "react-imgix"

import ProjectDisplay from '../components/projectDisplay.js'
import Layout from "../components/layout"
import SEO from "../components/seo"

class Projects extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedProject: {},
      modalOpen: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    const tempState = state
    const list = props.data.allCosmicjsProjects.edges
    let projectName
    if (typeof window !== "undefined") {
      projectName = decodeURI(window.location.search).substring(1)
    }
    for (const i in list) {
      if (list[i].node.title === projectName) {
        tempState.selectedProject = list[i].node
        tempState.modalOpen = true
      }
    }
    return tempState
  }

  render() {
    const pageData = this.props.data.cosmicjsPages.metadata
    const projectData = this.props.data.allCosmicjsProjects.edges
    const connectData = this.props.data.allCosmicjsConnects.edges
    const contactData = this.props.data.cosmicjsContacts.metadata
    const siteData = this.props.data.cosmicjsSettings.metadata
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
    const styles = {
      header: {
        padding: '0',
      },
      modal: {
        top: '50px'
      },
      gallery: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }
    }
    if (pageData.splash_image) {
      styles.header.background = `url(${pageData.splash_image.imgix_url}?q=100&auto=format,compress)`
      styles.header.backgroundSize = 'cover'
      styles.header.backgroundPosition = 'center'
    }
    return (
      <Layout
        siteTitle={siteData.site_title}
        siteLogo={siteData.site_logo}
        contact={contactData}
        connect={connectData}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Projects" />
        <section className="page-container">
          <header className="page-header projects" style={styles.header}>
            <div className="header-filter">
              <h3>Check Out My Work</h3>
              <p className="page-header-description">{pageData.summary}</p>
            </div>
          </header>
          <div className="project-gallery">
            {projectData.map(project => {
              return (
                <ProjectDisplay
                  key={project.node.title}
                  title={project.node.title}
                  description={project.node.metadata.description}
                  summary={project.node.metadata.summary}
                  imgix_url={project.node.metadata.image.imgix_url}
                  size="tall"
                />
              )
            })}
          </div>
          <Modal style={styles.modal} show={this.state.modalOpen} onHide={this.handleClose} size="md">
            {this.state.selectedProject.title
              ? <Modal.Header>
                <Modal.Title>{this.state.selectedProject.title}</Modal.Title>
                <p>{this.state.selectedProject.metadata.date}</p>
              </Modal.Header>
              : null
            }
            {this.state.selectedProject.title
              ? <Modal.Body>
                {this.state.selectedProject.metadata.description}
                <div className="modal-gallery" style={styles.gallery}>
                  {this.state.selectedProject.metadata.gallery.map(imgixUrl => (
                    <Imgix src={imgixUrl} key={imgixUrl} alt={this.state.selectedProject.title} sizes="10vw"/>
                  ))}
                </div>
              </Modal.Body>
              : null
            }
          </Modal>
        </section>
      </Layout>
    )
  }

  handleClose() {
    if (typeof window !== 'undefined') {
      window.location.href = window.location.protocol + window.location.pathname
    }
  }
}

export const query = graphql`
  query Projects {
    cosmicjsPages(slug: { eq: "projects" }) {
      metadata {
        splash_image {
          imgix_url
        }
        summary
      }
    }
    allCosmicjsProjects {
      edges {
        node {
          title
          metadata {
            date
            gallery
            image {
              imgix_url
            }
            summary
            description
          }
        }
      }
    }
    allCosmicjsConnects {
      edges {
        node {
          title
          metadata {
            url
          }
        }
      }
    }
    cosmicjsContacts(slug: {eq: "company-footer"}) {
      metadata {
        address1
        address2
        postal_code
        city
        region
        country_code
        email
        phone_number
      }
    }
    cosmicjsSettings(slug: { eq: "site-data" }) {
      metadata {
        site_title
        site_logo {
          imgix_url
        }
      }
    }
  }
`

Projects.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Projects