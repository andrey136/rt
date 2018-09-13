import React, {Component} from 'react';

class Table extends Component {

  functionDone(id){
    const newList = this.props.list;
    let indexOfItem = newList.findIndex(el => el.id === id);
    //newList.map(el => el.id === id ? indexOfItem = newList.indexOf(el) : '');
    newList[indexOfItem].done = !newList[indexOfItem].done;
    this.props.onChange(newList);
  }

  saveEditedItem() {
    const id = this.props.editedItem.id;
    const index = this.props.list.findIndex(el => el.id === id);
    const newList = this.props.list;
    newList[index] = this.props.editedItem;
    this.props.saveEditedItem(newList);
  }

  editForm(el) {
    this.props.editItem(el);
    return (
      <div>
        <input
          type="text"
          value={this.props.editedItem.title}
          onChange={(e) => this.props.changeEditedInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => this.saveEditedItem()}>Save</button>
      </div>
    )
  }

  functionDeleteItem(id){
    let newList = this.props.list;
    let indexOfItem;
    newList.map(el => el.id === id ? indexOfItem = newList.indexOf(el) : '');
    newList = newList.filter(el => el !== newList[indexOfItem]);
    console.log(indexOfItem, '***');
    this.props.onChange(newList);
  }

  render() {
    console.log(this.props.list);
    return (
      <div>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">My List</th>
            <th className="th">{}</th>
          </tr>
          </thead>
          <tbody id="list">{
            this.props.list.map((el) =>
              <tr key={el.id}>
                <td className={el.done + ""}>
                  {el.title}
                </td>
                <td className="th">
                  <button className="btn btn-outline-success" onClick={() => this.functionDone(el.id)}>Done</button>
                  <button className="btn btn-primary" onClick={() => this.editForm(el)}>Edit</button>
                  <i className="fas fa-backspace" onClick={() => this.functionDeleteItem(el.id)}>{}</i>
                </td>
              </tr>
            )}</tbody>
        </table>
        {this.props.isEdited && this.editForm()}
      </div>
    )
  }
}
export default Table;