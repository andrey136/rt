import React, {Component} from 'react';
import uniqid from 'uniqid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: 'abc',
      isEdited: false,
      editedItem: {},
      list: [{
        title: 'Some',
        id: uniqid(),
        done: false
      },{
        title: 'Google',
        id: uniqid(),
        done: false
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
    this.setState({inputText: value})
  }

  removeAllItems() {
    this.setState({
      list: [],
      inputText: ''
    })
  }

  done(id) {
    console.log('done');
    const list = this.state.list;
    list.map(el => el.id === id ? el.done = !el.done : '');
    this.setState({
      list: list
    })
  }

  deleteItem(id) {
    this.setState({
      list: [...this.state.list.filter(el => el.id !== id)],
    })

  }

  editItem(el) {
    console.log(el);
    this.setState({ isEdited: true, editedItem: el });
  }

  changeEditedInput(value){
    this.setState({
      editedItem: {
        ...this.state.editedItem,
        title: value
      }
    })
  }

  saveEditedItem() {
    const id = this.state.editedItem.id;
    const index = this.state.list.findIndex(el => el.id === id);
    const newList = this.state.list;
    newList[index] = this.state.editedItem;

    this.setState({
      list: newList,
      editedItem: {},
      isEdited: false
    });
    console.log(index);
  }

  editForm() {
    return (
      <div>
        <input
          type="text"
          value={this.state.editedItem.title}
          onChange={(e) => this.changeEditedInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => this.saveEditedItem()}>Save</button>
      </div>
    )
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <h1>TODO List</h1>
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
                <td className={el.done + ""}>
                  {el.title}
                </td>
                <td className="th">
                  <button className="btn btn-outline-success" onClick={() => this.done(el.id)}>Done</button>
                  <button className="btn btn-primary" onClick={() => this.editItem(el)}>Edit</button>
                  <i className="fas fa-backspace" onClick={() => this.deleteItem(el.id)}>{}</i>
                </td>
              </tr>
            )}</tbody>
        </table>
        {this.state.isEdited && this.editForm()}
      </div>
    );
  }
}

export default App;
