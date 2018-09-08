import React, { Component } from 'react';


class App extends Component{
  constructor(props){
      super(props);

      this.state = {
          title: 'Counter: ',
          counter: 10,
          counters: [23, 45]
      };

  }

  plus(){
    const counter = this.state.counter + 1;
    const counters = [...this.state.counters];
    counters.push(counter);
    this.setState({
        counter,
        counters
    });
  }

  minus(){
      const counter = this.state.counter - 1;
      const counters = [...this.state.counters];
      counters.push(counter);
      this.setState({
          counter,
          counters
      });
  }

  render() {
    return (
      <div className="App">
          {this.state.title} {this.state.counter}

      <hr/>

          <button onClick={() => this.plus()}>Plus</button>
          <button onClick={() => this.minus()}>Minus</button>

      <hr/>

      <ul>
          {this.state.counters.map(el => <li key ={Math.random()}>{el}</li>)}
      </ul>

      </div>
    );
  }
}

export default App;
