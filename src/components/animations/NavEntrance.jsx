import React, { Component } from 'react';
import './NavEntrance.css'

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
                <div style={{ zIndex: 1000 }}
                    className={this.props.show ? "slideInLeft" : "slideOutLeft"}
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