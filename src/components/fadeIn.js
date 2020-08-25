import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useInView } from "react-intersection-observer"
var motion = null;
var useAnimation = null;

function FadeIn(props) {
    if(typeof window === 'undefined') {
        return <div/>
    }

    motion = require('framer').motion
    useAnimation = require('framer').useAnimation
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: props.threshold ?? 1, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, inView])

    return (
        <motion.div
            ref = { ref }
            animate={ controls }  
            initial= "hidden" 
            transition={{ duration: props.duration ?? .25 }}
            position="relative"
            size="100%"
            background="none"
            style={{ width: "100%" }}
            variants= {{
                visible: { opacity: 1 },
                hidden: { opacity: 0 }
            }}
        >
            {props.children}
        </motion.div>
    );
}

FadeIn.propTypes = {
    children: PropTypes.node.isRequired,
    threshold: PropTypes.number,
    duration: PropTypes.number,
  }

export default FadeIn