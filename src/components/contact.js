/**
 * A component that we will use for displaying 
 * a contact form that will let users email us if they have any inquires.
 */
import React, {Component} from "react"
import PropTypes from "prop-types"
import { Button, Animation, Input, Message } from "rsuite" 

const { Collapse } = Animation

class Contact extends Component {
    constructor() {
        super()
        this.state = {
            userName: '',
            userEmail: '',
            userMessage: '',
            messageSubject: '',
            messageError: '',
        }
        this.handleContactForm = this.handleContactForm.bind(this)
        this.handleInput = this.handleInput.bind(this)        
    }

    componentDidUpdate() {
        if(this.state.messageError) {
            window.setTimeout(() => this.setState({ messageError: false }), 3000)
        }
    }

    render() {
        const styles = {
            header: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
            contactForm: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            },
            inputRow: {
              width: '100%',
              display: 'flex',
              flexDirection: 'row'
            },
            title: {
              paddingRight: '50px',
              marginRight: '100px',
              borderRight: 'thin solid black'
            },
            description: {
              maxWidth: '400px',
              fontSize: '1.25rem',
              margin: '0',
            }
        } 
        return (
            <section name="contact" className="section-container content bottom contact">
                <div className="contact-container">
                <div className="imageFilter" />
                <div style={styles.header}>
                    <h2 style={styles.title}>Contact Us</h2>
                    <p style={styles.description}>Fill out the form below if you would like to get a hold of us.</p>
                </div>
                    <form style={styles.contactForm} onSubmit={this.handleContactForm}>
                        <Collapse in={this.state.messageError}>
                            <Message type="error" title="Error" description="Please Provide a valid input to all fields" />
                        </Collapse>
                        <div style={styles.inputRow}>
                            <Input name="userName" value={this.state.userName} onChange={this.handleInput} placeholder="Name" />
                            <Input name="userEmail" value={this.state.userEmail} onChange={this.handleInput} placeholder="Email" />
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
                        <Button type="submit" appearance="ghost">Send Mail</Button>
                    </form>
                </div>
            </section>
        )
    }

    handleContactForm(e) {
        e.preventDefault()
        if(!this.state.userName || !this.state.userEmail || !this.state.messageSubject || !this.state.userMessage) {
            this.setState({ messageError: true })
        } else {
            window.location.href = `
                mailto:${this.props.contactEmail}
                ?subject=${this.state.messageSubject}
                &body=Name :: ${this.state.userName}%0D%0AEmail :: ${this.state.userEmail}%0D%0ASent From :: ${window.location.href},%0D%0A%0D%0A${this.state.userMessage}`
        }
    }

    handleInput(value, e) {
        const { name } = e.target
        this.setState({ [name] : value })
    }
}

Contact.propTypes = {
    contactEmail: PropTypes.string.isRequired, 
}

export default Contact