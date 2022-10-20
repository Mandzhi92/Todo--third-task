import { Component } from 'react';
import './EditingTask.css';


export default class EditingTask extends Component {
  state = { value: '' };

  componentDidMount() {
    const { label } = this.props;
    this.setState({ value: label });
    this.input.focus();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const { onFormatLabel } = this.props;
    onFormatLabel(value);
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  blur = () => {
    const { value } = this.state;
    const { onFormatLabel } = this.props;
    onFormatLabel(value);
  };

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="edit"
          value={value}
          onChange={this.handleChange}
          onBlur={this.blur}
          ref={(input) => {
            this.input = input;
          }}
        />
      </form>
    );
  }
}




