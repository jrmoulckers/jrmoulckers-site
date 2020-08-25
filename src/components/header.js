import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Navbar, Nav } from "rsuite"
import Imgix from "react-imgix"

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      scrollTop: true,
      activeKey: '',
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        this.setState({ activeKey: window.location.hash })
      } else {
        this.setState({ activeKey: window.location.pathname })
      }
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  render() {
    const styles = {
      container: {
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        transition: '0.75s ease-in-out',
        background: 'rgba(0, 0, 0, .5)',
      },
      navheader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        margin: '1vh 5vw'
      },
      navbody: {
        position: 'absolute',
        margin: '0 5vw',
        right: '0',
      },
      navlink: {
        margin: '0 1vw',
      },
      link: {
        color: `var(--jrm-light-grey)`,
        textShadow: '0px 0px 1px #000000',
        margin: '0 0 0 30px',
        textDecoration: `none`,
      },
      logo: {
        width: '50px',
        padding: '10px',
        margin: '0',
      }
    }
    if (!this.state.scrollTop) {
      styles.container.background = `var(--jrm-dark-blue)`
      styles.container.color = `var(jrm-light-blue)`
      styles.link.color = `var(jrm-light-blue)`
      styles.link.textShadow = 'none'
    } else {
      styles.container.background = `rgba(0, 0, 0, .5)`
    }

    const { siteTitle, logo } = this.props
    return (
      <Navbar style={styles.container}>
        <Navbar.Header style={styles.navheader}>
          {
            logo 
              ? <Imgix src={logo.imgix_url} style={styles.logo} sizes="5vw"/> 
              : <h5>JM</h5>
          }
          <h1>
            <Link to="/" style={styles.link}>
              {siteTitle}
            </Link>
          </h1>
        </Navbar.Header>
        <Navbar.Body style={styles.navbody}>
          <Nav>
            <Nav.Item
              className={this.state.activeKey.includes('home') ? 'active' : ''}
              style={styles.navlink}
              componentClass={Link}
              to="/"
            >
              Home
            </Nav.Item>
            <Nav.Item
              className={this.state.activeKey.includes('projects') ? 'active' : ''}
              style={styles.navlink}
              componentClass={Link}
              to="/projects"
            >
              Projects
            </Nav.Item>
            <Nav.Item
              className={this.state.activeKey.includes('work') ? 'active' : ''}
              style={styles.navlink}
              componentClass={Link}
              to="/work"
            >
              Work
            </Nav.Item>
            {/* <Nav.Item
              className={this.state.activeKey.includes('about') ? 'active' : ''}
              style={styles.navlink}
              componentClass={Link}
              to="/about"
            >
              About
            </Nav.Item> */}
            {/* <Nav.Item
              className={this.state.activeKey.includes('contact') ? 'active' : ''}
              style={styles.navlink}
              componentClass={Link}
              to="/#contact"
            >
              Contact
            </Nav.Item> */}
          </Nav>
        </Navbar.Body>
      </Navbar>
    )
  }

  handleScroll() {
    let breakpoint = window.innerHeight * .7
    if (this.props.breakpoint) {
      breakpoint = this.props.breakpoint
    }
    if (window.scrollY > breakpoint) {
      this.setState({
        scrollTop: false,
      })
    } else {
      this.setState({
        scrollTop: true,
      })
    }
  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  logo: PropTypes.object,
  breakpoint: PropTypes.number,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header