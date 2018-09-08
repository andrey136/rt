import React, {Component} from 'react';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: 'abc',
            list: ['xfsfsa']
        };

    }

    addToList() {
      this.setState(
        {list: [...this.state.list, this.state.inputText],
        inputText: ''
      });
    }

    changeInput(value) {
      this.setState({ inputText: value })
    }

    removeAllItems() {
        this.setState({
            list: [],
            inputText: ''
        })
    }

    loadTodo(){
        console.log('Load');
    }

    render() {
        return (
            <div className="container">
                <h1>TODO List</h1>
                <button className="btn btn-primary" onClick={() => this.loadTodo()}>Load TODO</button>
                <hr/>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Text here"
                        aria-label="Text"
                        id="input"
                        value={this.state.inputText}
                        onChange={(e) => this.changeInput(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => this.addToList()}
                    >Add to list
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => this.removeAllItems()}
                    >Remove all items
                    </button>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">My List</th>
                            <th className="th">{}</th>
                        </tr>
                    </thead>
                    <tdody id="list">{
                        this.state.list.map((el, cnt) =>
                            <tr>
                                <td className="done">{el}</td>
                                <td className="th">
                                    <button className="btn btn-outline-success" key="0">Done</button>
                                    <i key={cnt} className="fas fa-backspace">{}</i>
                                </td>
                            </tr>
                        )
                    }</tdody>
                </table>

                <ul>

                </ul>

            </div>
        );
    }
}

export default App;
