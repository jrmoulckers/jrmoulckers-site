import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

class ProjectDisplay extends React.Component {
  constructor() {
    super()
    this.state = {
      hover: false
    }
    this.handleHover = this.handleHover.bind(this)
    this.handleUnHover = this.handleUnHover.bind(this)
  }

  render() {
    let styles = {
      container: {
        margin: '10px 0 0 10px',
        minWidth: '200px',
        minHeight: '200px',
        height: '200px',
        overflow: 'hidden',
        textDecoration: 'none',
      },
      details: {
        height: '200px',
        width: '200px',
        padding: '30px',
        opacity: '0',
        color: '#d3d3d3',
        background: 'rgba(0, 0, 0, 0.6)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        overflowY: 'none',
        transition: '0.3s ease-in-out'
      },
      title: {
        fontSize: '2rem',
        alignText: 'center',
      },
      description: {
        fontSize: '1rem',
      }
    }
    if (this.props.imgix_url) {
      styles.container.background = `url(${this.props.imgix_url}?w=200&h=200&q=100&auto=format,compress)`
      styles.container.backgroundSize = 'cover'
      styles.container.backgroundPosition = 'center'
    }
    if (this.props.size === 'tall') {
      styles.container.height = '400px'
      styles.container.width = '400px'
      styles.details.height = '400px'
      styles.details.width = '400px'
      styles.container.background = `url(${this.props.imgix_url}?w=400&h=400&q=100&auto=format,compress)`
    }
    if (this.state.hover) {
      styles.details.opacity = '1'
    }

    return (
      <Link
        to={`/projects?${encodeURI(this.props.title)}`}
        style={styles.container}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleUnHover}
      >
        <div style={styles.details}>
          <h5 style={styles.title}>{this.props.title}</h5>
          <p style={styles.summary}>{this.props.summary}</p>
        </div>
      </Link>
    )
  }

  handleHover() {
    this.setState({ hover: true })
  }
  handleUnHover() {
    this.setState({ hover: false })
  }
}

ProjectDisplay.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  summary: PropTypes.string,
  imgix_url: PropTypes.string,
  size: PropTypes.string,
}

export default ProjectDisplay