import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { Icon } from "@blueprintjs/core"
import { Button, Input, Message, Animation } from "rsuite"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectDisplay from '../components/projectDisplay.js'

const { Fade, Collapse } = Animation

// Home Page
class IndexPage extends React.Component {
  constructor() {
    super()
    this.state = {
      workHeight: 0,
      showWork: false,
      peopleHeight: 0,
      showPeople: false,
      contactHeight: 0,
      showContact: false,
      userName: '',
      userEmail: '',
      userMessage: '',
      messageSubject: '',
      messageError: false,
    }
    this.updateDimensions = this.updateDimensions.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleContactForm = this.handleContactForm.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount() {
    const workHeight = this.workElement.clientHeight
    const peopleHeight = this.peopleElement.clientHeight
    const contactHeight = this.contactElement.clientHeight
    this.setState({ workHeight, peopleHeight, contactHeight })
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener("resize", this.updateDimensions)
  }
  componentDidUpdate() {
    if (this.state.messageError) {
      window.setTimeout(() => this.setState({ messageError: false }), 3000)
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener("resize", this.updateDimensions)
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
      splashPhrase: {
        width: '70%',
        paddingLeft: '20%',
        color: '#ffffff',
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
      serviceName: {
        fontSize: '1.2rem',
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
      styles.splash.background = `url(${pageData.splash_image.imgix_url}?q=100&auto=format,compress)`
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
              ? <div className="splash-phrase" style={styles.splashPhrase}>
                <h2 style={{ fontSize: '2.5rem' }}>{pageData.splash_phrase}</h2>
              </div>
              : null
            }
          </section>
          <section
            ref={el => { this.workElement = el }}
            style={styles.work}
            className="section-container content work"
          >
            <Fade in={this.state.showWork}>
              <div className="section-wrapper">
                <div className="section-header" style={styles.header}>
                  <h2 className="section-title" style={styles.title}>What I do</h2>
                  <p className="people-description" style={styles.description}>{pageData.service_description}</p>
                </div>
                <div className="wrapper-content services">
                  {serviceData.map(service => (
                    <Link to="/work" key={service.node.title} className="service-link" style={styles.service}>
                      <Icon icon={service.node.metadata.icon} iconSize={Icon.SIZE_LARGE} />
                      <h5 style={styles.serviceName}>{service.node.title}</h5>
                      <p style={styles.serviceDescription}>{service.node.metadata.summary}</p>
                    </Link>
                  ))}
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
              </div>
            </Fade>
          </section>
          <section
            ref={el => { this.peopleElement = el }}
            className="section-container content people"
          >
            <Fade in={this.state.showPeople}>
              <div className="section-wrapper">
                <div style={styles.header}>
                  <h2 className="section-title" style={styles.title}>Who We Are</h2>
                  <p style={styles.description}>{pageData.people_description}</p>
                </div>
                <div className="wrapper-content people">
                  {peopleData.map(person => {
                    return (
                      <Link key={person.node.title} to="/about" style={styles.person}>
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
              </div>
            </Fade>
          </section>
          <section
            ref={el => { this.contactElement = el }}
            name="contact"
            className="section-container content bottom contact"
          >
            <Fade in={this.state.showContact}>
              <div className="contact-container">
                <div className="imageFilter" />
                <div style={styles.header}>
                  <h2 className="section-title" style={styles.title}>Contact Me</h2>
                  <p style={styles.description}>Fill out the form below if you would like to get in touch with me!</p>
                </div>
                <form style={styles.contactForm} onSubmit={this.handleContactForm}>
                  <Collapse in={this.state.messageError}>
                    <Message type="error" title="Error: Populate All Fields" description="Please provide input to all fields..." />
                  </Collapse>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Input name="userName" value={this.state.userName} onChange={this.handleInput} placeholder="Name" />
                    <Input name="userEmail" value={this.state.userEmail} onChange={this.handleInput} placeholder="Email" style={{marginLeft: "15px"}} />
                  </div>
                  <Input name="messageSubject" value={this.state.messageSubject} onChange={this.handleInput} placeholder="Subject" />
                  <Input
                    componentClass="textarea"
                    name="userMessage"
                    value={this.state.userMessage}
                    onChange={this.handleInput}
                    rows={5}
                    placeholder="Message..."
                  />
                  <Button type="submit" appearance="ghost">
                    Send Mail
                  </Button>
                </form>
              </div>
            </Fade>
          </section>
        </Layout>
    )
  }

  updateDimensions() {
    this.setState({
      workHeight: this.workElement.clientHeight,
      peopleHeight: this.peopleElement.clientHeight,
      contactHeight: this.contactElement.clientHeight,
    })
  }

  handleScroll() {
    const yFocus = window.scrollY + window.innerHeight / 3
    if (yFocus >= window.innerHeight / 2) {
      this.setState({ showWork: true })
    } else {
      this.setState({ showWork: false })
    }
    if (yFocus >= (window.innerHeight + this.state.workHeight)) {
      this.setState({ showPeople: true })
    } else {
      this.setState({ showPeople: false })
    }    
    if (yFocus >= (window.innerHeight + this.state.workHeight + this.state.peopleHeight)) {
      this.setState({ showContact: true })
    } else {
      this.setState({ showContact: false })
    }
  }

  handleContactForm(e) {
    e.preventDefault()
    if (!this.state.userName || !this.state.userEmail || !this.state.messageSubject || !this.state.userMessage) {
      this.setState({ messageError: true })
    } else {
      window.location.href = `
        mailto:${this.props.data.cosmicjsPages.metadata.contact_email}
        ?subject=${this.state.messageSubject}
        &body=Name :: ${this.state.userName}%0D%0AEmail :: ${this.state.userEmail}%0D%0ASent From :: ${window.location.href},%0D%0A%0D%0A${this.state.userMessage}`
    }
  }

  handleInput(value, e) {
    const { name } = e.target
    this.setState({ [name]: value })
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