import React, {Component} from 'react';
import uniqid from 'uniqid';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: 'abc',
            list: [{
                title: 'Some',
                id: uniqid(),
                done: false,
            }]
        };

    }

    addToList() {
      const list = this.state.list;
      list.push({
          title: this.state.inputText,
          id: uniqid(),
          done: false
      });
        this.setState({
        list: list,
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
        let list = this.state.list;
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(function (response) {
                let todos = response.data;
                console.log(todos);
                todos.map(el => ({
                    ...el,
                    done: el.completed
                }));
                list.concat(todos);

            })
            .catch(function (error) {
                console.log('ERROR', error);
            });
        this.setState({
            list: list
        });
    }

    deleteItem(id){
        this.setState({
            list: [...this.state.list.filter(el => el.id !== id)],
        })

    }

    done(id){
        console.log('done');
        const list = this.state.list;
        list.map(el => el.id === id ? el.done = !el.done : '');
        this.setState({
            list: list
        })
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
                    <tbody id="list">{
                        this.state.list.map((el) =>
                            <tr key={el.id}>
                                <td className={el.done + ""}>{el.id}{el.title}</td>
                                <td className="th">
                                    <button className="btn btn-outline-success" onClick={ () => this.done(el.id) }>Done</button>
                                    <i className="fas fa-backspace" onClick={() => this.deleteItem(el.id) }>{}</i>
                                </td>
                            </tr>
                        )
                    }</tbody>
                </table>
            </div>
        );
    }
}

export default App;
