import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { Icon } from "@blueprintjs/core"
import { Button, Form, Input } from 'antd'

import '../styling/custom-rsuite-theme.less'
import './index.less'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectDisplay from '../components/projectDisplay.js'
import FadeIn from "../components/fadeIn"

// Home Page
class IndexPage extends React.Component {

  handleContactForm(values) {
    if (values.userName && values.userEmail && values.messageSubject && values.userMessage) {
      console.log("done")
      window.open(`
          mailto:${this.props.data.cosmicjsPages.metadata.contact_email}
          ?subject=${values.messageSubject}
          &body=Name :: ${values.userName}%0D%0AEmail :: ${values.userEmail}%0D%0ASent From :: ${window.location.href},%0D%0A%0D%0A${values.userMessage}
        `,
        '__blank'
      );
    }
  }

  render() {
    const pageData = this.props.data.cosmicjsPages.metadata
    const siteData = this.props.data.cosmicjsSettings.metadata
    const contactData = this.props.data.cosmicjsContacts.metadata
    const connectData = this.props.data.allCosmicjsConnects.edges
    const peopleData = this.props.data.allCosmicjsPeople.edges
    const serviceData = this.props.data.allCosmicjsServices.edges
    const projectData = this.props.data.allCosmicjsProjects.edges
    let headerBreakpoint
    if (typeof window !== 'undefined') {
      headerBreakpoint = window.innerHeight - 125
    }
    const styles = {
      splash: {
        background: `#000000`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      splashPhraseContainer: {
        width: '70%',
        paddingLeft: '20%',
      },
      splashPhrase: {
        color: 'var(--jrm-light-grey)',
        fontSize: '2.5rem',
      },
      work: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '50px 0',
      },
      title: {
        paddingRight: '50px',
        margin: 0,
        borderRight: 'thin solid black'
      },
      description: {
        paddingLeft: '50px',
        maxWidth: '400px',
        fontSize: '1.25rem',
        margin: '0',
      },
      contactForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      service: {
        height: '250px',
        width: '200px',
        margin: '50px',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflowX: 'auto',
        color: 'black',
      },
      serviceicon: {
        marginBottom: '.5rem',
      },
      serviceName: {
        fontSize: '1.2rem',
        marginBottom: '.5rem',
      },
      serviceDescription: {
        fontSize: '0.9rem',
        color: '#a9a9a9',
      },
      person: {
        width: '25%',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none'
      },
      personName: {
        marginTop: '0',
        color: 'black',
        fontSize: '1rem',
        height: '2rem',
        textAlign: 'center',
      },
      personTitle: {
        color: 'grey',
        fontSize: '0.8rem',
      }
    }
    if (pageData.splash_image) {
      styles.splash.background = 'var(--jrm-maroon)'//`url(${pageData.splash_image.imgix_url}?q=100&auto=format,compress)`
      styles.splash.backgroundSize = `cover`
      styles.splash.backgroundRepeat = 'no-repeat'
      styles.splash.backgroundPosition = 'center'
    }
    return (
      <Layout
        siteTitle= {siteData.site_title}
        siteLogo= {siteData.site_logo}
        contact={contactData}
        connect={connectData}
        headerBreakpoint={headerBreakpoint}
      >
        <SEO title="Home" keywords={[`cosmic js`, `application`, `react`]} />
        <section style={styles.splash} className="section-container splash">
          {pageData.splash_phrase
            ? <div className="splash-phrase" style={styles.splashPhraseContainer}>
              <h2 style={styles.splashPhrase}>{pageData.splash_phrase}</h2>
            </div>
            : null
          }
        </section>
        <section
          ref={el => { this.workElement = el }}
          style={styles.work}
          className="section-container content work"
        >
          <div className="section-wrapper">
            <FadeIn threshold={.4}>
              <div className="section-header" style={styles.header}>
                <h2 className="section-title" style={styles.title}>What I do</h2>
                <p className="people-description" style={styles.description}>{pageData.service_description}</p>
              </div>
              <div className="wrapper-content services">
                {serviceData.map(service => (
                  <Link to="/work" key={service.node.title} className="service-link" style={styles.service}>
                    <Icon style={styles.serviceicon} icon={service.node.metadata.icon} iconSize={32} />
                    <h5 style={styles.serviceName}>{service.node.title}</h5>
                    <p style={styles.serviceDescription}>{service.node.metadata.summary}</p>
                  </Link>
                ))}
              </div>
            </FadeIn>
            <FadeIn threshold={.4}>
              <div className="section-header" style={styles.header}>
                <h2 className="section-title" style={styles.title}>My projects</h2>
                <p className="projects-description" style={styles.description}>{pageData.project_description}</p>
              </div>                
              <div className="wrapper-content projects">
                {projectData.map(project => (
                  <ProjectDisplay
                    key={project.node.title}
                    title={project.node.title}
                    description={project.node.metadata.summary}
                    imgix_url={project.node.metadata.image.imgix_url}
                  />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
        <section
          ref={el => { this.peopleElement = el }}
          className="section-container content people"
        >
          <div className="section-wrapper">
            <FadeIn threshold={.4}>
              <div style={styles.header}>
                <h2 className="section-title" style={styles.title}>Who I am</h2>
                <p style={styles.description}>{pageData.people_description}</p>
              </div>
              <div className="wrapper-content people">
                {peopleData.map(person => {
                  return (
                    // <Link key={person.node.title} to="/about" style={styles.person}>
                    <Link key={person.node.title} to="/" style={styles.person}>
                      <div
                        style={{
                          background: `url(${person.node.metadata.image.imgix_url}?q=100&auto=format,compress)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          marginBottom: '14px',
                          width: '100%',
                          height: '200px',
                        }}
                      />
                      <h5 style={styles.personName}>{person.node.title}</h5>
                      <h6 style={styles.personTitle}>{person.node.metadata.job_title}</h6>
                    </Link>
                  )
                })}
              </div>
            </FadeIn> 
          </div>
        </section>
        <section
          ref={el => { this.contactElement = el }}
          name="contact"
          className="section-container content bottom contact"
        >
          <div className="section-wrapper">
            <FadeIn threshold={.4}>
              <div className="contact-container">
                <div style={styles.header}>
                  <h2 className="section-title" style={styles.title}>Contact Me</h2>
                  <p style={styles.description}>Fill out the form below if you would like to get in touch with me!</p>
                </div>
                <Form style={styles.contactForm} onFinish={this.handleContactForm}>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Form.Item
                      name="userName"
                      rules={[{ required: true, message: 'Please input a name.' }]}
                      style={{width:'48%'}}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                      name="userEmail"
                      rules={[{ required: true, message: 'Please input an email.' }]}
                      style={{width:'48%'}}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </div>
                  <Form.Item
                    name="messageSubject"
                    rules={[{ required: true, message: 'Please input a subject.' }]}
                    style={{width:'100%'}}
                  >
                    <Input placeholder="Subject" />
                  </Form.Item>
                  <Form.Item
                    name="userMessage"
                    rules={[{ required: true, message: 'Please input a message.' }]}
                    style={{width:'100%'}}
                  >
                    <Input.TextArea
                      rows={5}
                      placeholder="Message..."
                    />
                  </Form.Item>
                  <Form.Item
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </FadeIn>
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.object,
}

export const query = graphql`
query Index {
  cosmicjsPages(slug: { eq: "home" }) {
    metadata {
      splash_image {
        imgix_url
      }
      splash_phrase
      contact_email
      service_description
      people_description
      project_description
    }
  }
  allCosmicjsPeople {
    edges {
      node {
        title
        metadata {
          image {
            imgix_url
          }
          job_title
        }
      }
    }
  }
  allCosmicjsServices {
    edges {
      node {
        title
        metadata {
          icon
          description
          summary
        }
      }
    }
  }
  allCosmicjsProjects {
    edges {
      node {
        title
        metadata {
          date
          image {
            imgix_url
          }
          gallery
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
  cosmicjsSettings(slug: {eq: "site-data"}) {
    metadata {
      site_title
      site_logo {
        imgix_url
      }
    }
  }
}
`

export default IndexPage