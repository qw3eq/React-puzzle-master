import React, { Component } from 'react';

import { ChildTile } from './ChildTile';

export class ParentTile extends Component {


  render() {
    let colors = this.props.childrenColor;
    let selected = this.props.isSelected ? "selected" : "";
    return (
    <div className={`quadTile ${selected}`} id={this.props.id}>
      <ChildTile color={colors[0]} onClick={this.test}/>
      <ChildTile color={colors[1]} onClick={this.test}/>
      <ChildTile color={colors[2]} onClick={this.test}/>
      <ChildTile color={colors[3]} onClick={this.test}/>

    </div>
  )
  }
}
