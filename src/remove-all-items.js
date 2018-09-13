import React, {Component} from 'react';

class RemoveAllItems extends Component {

  removeAllItemsFunction() {
    const newList = [];
    this.props.onChange(newList);
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
