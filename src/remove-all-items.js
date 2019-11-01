import React, {Component} from 'react';
import axios from "axios";

class RemoveAllItems extends Component {

  removeAllItemsFunction() {
    const newList = [];
    axios.delete(`https://frightful-flesh-30245.herokuapp.com/api/list/deleteAll/${localStorage.getItem('_id')}`)
      .then((res) => {
        console.log('DELETE-ALL', res.data);
        this.props.onChange(res.data.list);
      })
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          onClick={() => this.removeAllItemsFunction()}
        >Remove all items
        </button>
      </div>
    )
  }
}
export default RemoveAllItems;
