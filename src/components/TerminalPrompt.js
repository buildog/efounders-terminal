import React, { Component, PropTypes } from 'react';

const styles = {
  caret: (caret) => ({
    left: `${caret}ch`,
  }),
};

class TerminalPrompt extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    prompt: PropTypes.object.isRequired,
    //
    executeCommand: PropTypes.func.isRequired,
    caretLeft: PropTypes.func.isRequired,
    caretRight: PropTypes.func.isRequired,
    historyPrevious: PropTypes.func.isRequired,
    historyNext: PropTypes.func.isRequired,
    typeCommand: PropTypes.func.isRequired,
  };
  componentDidMount() {
    const { input } = this.refs;
    input.focus();
  }
  componentDidUpdate(prevProps) {
    const { index: prevIndex } = prevProps.history;
    const { index } = this.props.history;
    if (prevIndex !== index) {
      const { input } = this.refs;
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
      }, 0);
    }
  }
  onChange = (event) => {
    const { typeCommand } = this.props;
    typeCommand(event.target.value);
  };
  onSubmit = (event) => {
    event.preventDefault();
    //
    const { executeCommand } = this.props;
    const { input } = this.refs;
    const { target: form } = event;
    //
    executeCommand(input.value);
    form.reset();
  };
  onKeyDown = (event) => {
    const KEY_LEFT = 37;
    const KEY_UP = 38;
    const KEY_RIGHT = 39;
    const KEY_DOWN = 40;
    //
    const { prompt, caretLeft, caretRight, history, historyPrevious, historyNext } = this.props;
    const { which } = event;
    const { input } = this.refs;
    if (which === KEY_LEFT && prompt.caret > 0) {
      caretLeft();
    } else if (which === KEY_UP) {
      if (history.index > 0) {
        historyPrevious();
      } else {
        setTimeout(() => {
          input.setSelectionRange(prompt.caret, prompt.caret);
        }, 0);
      }
    } else if (which === KEY_RIGHT && prompt.caret < prompt.value.length) {
      caretRight();
    } else if (which === KEY_DOWN) {
      if (history.index < history.commands.length - 1) {
        historyNext();
      } else {
        setTimeout(() => {
          input.setSelectionRange(prompt.caret, prompt.caret);
        }, 0);
      }
    }
  };
  render() {
    const { prompt } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <span>efounders.co:website hacker${'\u00a0'}</span>
        <label className="l-console__label" htmlFor="terminal-input">
          <span>{prompt.value}</span>
          <span className="l-console__caret" style={styles.caret(prompt.caret)}>|</span>
        </label>
        <input
          className="l-console__input"
          id="terminal-input"
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          ref="input"
          value={prompt.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          maxLength="50"
        />
      </form>
    );
  }
}

export default TerminalPrompt;
