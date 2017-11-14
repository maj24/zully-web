import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="app-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
