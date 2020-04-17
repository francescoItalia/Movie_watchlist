import React, { Component } from 'react';
import './Slide.css'

class Slide extends Component {
    state = {
        shouldRender: this.props.show
    }

    componentDidUpdate(prevProps) {
        if (this.props.show !== prevProps.show) {
            if (this.props.show) this.setState({ shouldRender: true })
        }
    }

    render() {
        return (
            this.state.shouldRender && (
                <div
                    style={{ animation: `${this.props.show ? "slideInLeft" : "slideOutLeft"} .5s` }}
                    onAnimationEnd={this.onAnimationEnd}
                >
                    {this.props.children}
                </div>
            )
        )
    }

    onAnimationEnd = () => {
        if (!this.props.show) this.setState({ shouldRender: false })
    };
}

export default Slide;