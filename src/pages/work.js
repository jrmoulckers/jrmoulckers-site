/** 
 * This will a section highlighting our skills 
 * and the types of services / work we offer to 
 * people that might peruse our portfolios.
 */
import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import Imgix from "react-imgix"
import { Icon } from "@blueprintjs/core"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Work extends React.Component {
  constructor() {
    super()
    this.state = {
      activeIndex: null
    }
    this.handleServiceClick = this.handleServiceClick.bind(this)
  }

  render() {
    const pageData = this.props.data.cosmicjsPages.metadata
    const serviceData = this.props.data.allCosmicjsServices.edges
    const clientData = this.props.data.allCosmicjsClients.edges
    const contactData = this.props.data.cosmicjsContacts.metadata
    const connectData = this.props.data.allCosmicjsConnects.edges
    const siteData = this.props.data.cosmicjsSettings.metadata
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight / 3
    }
    const styles = {
      pageHeader: {
        padding: '0',
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerText: {
        fontSize: '2.5rem',
        padding: '20px',
        borderBottom: 'thin solid black',
      },
      splashPhrase: {
        color: 'var(--jrm-light-grey)',
      },
      serviceList: {
        width: '80vw',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      clientList: {
        width: '70%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      clientItem: {
        width: '150px',
        height: '150px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'black'
      },
      clientImage: {
        width: '75%',
        margin: '10px auto',
      },
      serviceContainer: (i) => {
        if (this.state.activeIndex === i) {
          return {
            height: 'auto',
            width: "25%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 2px gray',
          }
        } else {
          return {
            height: 'auto',
            width: "25%",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            cursor: 'pointer',
          }
        }
      },
      serviceExtra: {
        margin: '30px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      serviceDetails: {
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      serviceicon: {
        marginBottom: '.5rem',
      },
      toggleserviceicon: {
        marginTop: '2rem',
      },
      summary: {
        maxWidth: '50%',
        paddingRight: '50px',
        margin: '0 20px',
        textAlign: 'right',
        fontSize: '1.5rem',
        borderRight: 'thin solid black'
      },
      description: {
        maxWidth: '25%',
        marginRight: '30px',
        fontSize: '1.0rem'
      },
      detailsName: {
        fontSize: '1.3rem',
      },
      detailsDesc: {
        fontSize: '0.9rem',
      },
    }
    if (pageData.splash_image) {
      styles.pageHeader.background = `url(${pageData.splash_image.imgix_url}?q=100&auto=format,compress)`
      styles.pageHeader.backgroundSize = 'cover'
      styles.pageHeader.backgroundPosition = 'center'
    }
    return (
      <Layout
        siteTitle={siteData.site_title}
        siteLogo={siteData.site_logo}
        contact={contactData}
        connect={connectData}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Work" />
        <section className="page-container work">
          <header className="page-header work" style={styles.pageHeader}>
            <div className="header-filter">
              <h3 style={styles.splashPhrase}>What I Do</h3>
              {pageData.splash_phrase
                ? <p className="page-header-description">{pageData.splash_phrase}</p>
                : null
              }
            </div>
          </header>
          <section className="section-container short row">
            <h4 className="intro-summary" style={styles.summary}>{pageData.intro_summary}</h4>
            <p className="intro-description" style={styles.description}>{pageData.intro_description}</p>
          </section>
          <section className="section-container services medium" style={styles.serviceList}>
            {serviceData.map(service => (
              <div
                key={service.node.title}
                className="service-container"
                style={styles.serviceContainer(serviceData.indexOf(service))}
                onClick={() => this.handleServiceClick(serviceData.indexOf(service))}
              >
                <div style={styles.serviceDetails}>
                  {service.node.metadata.icon ? <Icon style={styles.serviceicon} icon={service.node.metadata.icon} iconSize={32} /> : null}
                  <h5 style={styles.detailsName}>{service.node.title}</h5>
                  <p style={styles.detailsDesc}>{service.node.metadata.summary}</p>
                  {this.state.activeIndex === serviceData.indexOf(service)
                    ? <section>
                        <div style={styles.serviceExtra}>
                          <p style={styles.detailsDesc}>{service.node.metadata.description}</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <Icon icon='circle-arrow-up' style={styles.toggleserviceicon} iconSize={32}/>
                        </div>
                      </section>
                    : null
                  }
                </div>
              </div>
            ))}
          </section>
          <section className="section-container medium">
            <div style={styles.header}>
              <h2 style={styles.headerText}>My Clients</h2>
            </div>
            <div style={styles.clientList}>
              {clientData.map(client => (
                <a key={client.node.title} style={styles.clientItem} href={client.node.metadata.url ?? 'javascript:void(0)'}>
                  <p>{client.node.title}</p>
                  <Imgix src={client.node.metadata.image.imgix_url ?? ''} alt={client.node.title} style={styles.clientImage} height={125}/> 
                </a>
              ))}
            </div>
          </section>
        </section>
      </Layout>
    )
  }

  handleServiceClick(index) {
    if(index == this.state.activeIndex) {
      this.setState({ activeIndex: null })
    } else {
      this.setState({ activeIndex: index })
    }
  }
}

export const query = graphql`
query Work {
    cosmicjsPages(slug: { eq: "work" }) {
      metadata {
        splash_image {
          imgix_url
        }
        splash_phrase
        intro_summary
        intro_description
      }
    }
    allCosmicjsServices {
      edges {
        node {
          title
          metadata {
            icon
            summary
            description
          }
        }
      }
    }
    allCosmicjsClients {
      edges {
        node {
          title
          metadata {
            url
            image {
              imgix_url
            }
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

Work.propTypes = {
  data: PropTypes.object,
}

export default Work