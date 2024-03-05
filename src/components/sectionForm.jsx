import React, { Component } from "react";
class SectionForm extends Component {
  state = {
    text: "",
  };

  isDisabled() {
    return this.state.text === "";
  }

  handeleSubmit = (e) => {
    e.preventDefault();
    if (this.props.sid !== "null") {
      this.props.onSubmitt(this.state.text, this.props.sid);
    } else {
      this.props.onSubmitt(this.state.text);
    }

    this.setState({ text: "" });
  };

  handleChange = (e) => {
    let text = this.state.text;
    text = e.currentTarget.value;
    this.setState({ text });
  };
  render() {
    return (
      <div className="mx-auto">
        <form className="form-inline mt-2" onSubmit={this.handeleSubmit}>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="eventName" className="sr-only">
              Section Name
            </label>
            <input
              type="text"
              className="form-control"
              id="eventName"
              placeholder="Enter Section Name"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2"
            disabled={this.isDisabled()}
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default SectionForm;
