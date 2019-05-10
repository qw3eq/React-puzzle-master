import React, { Component } from 'react';

export class ChildTile extends Component {
  render() {
    let color = this.props.color ? "red" : "blue";
    return(
      <div className={`singleTile ${color}`} >

      </div>
    )
  }
}
