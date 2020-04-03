import React, { Component } from "react";

class Button extends Component {
    render() {
        return (
            <button className="details_button" type="button" onClick={this.props.toggleDetails}>
                {this.props.detailsShown ? "Hide" : "Show"}
            </button>
        );
    }
}

export default Button;