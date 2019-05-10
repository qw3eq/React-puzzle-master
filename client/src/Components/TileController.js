import React, { Component } from 'react';

import { ParentTile } from './ParentTile'

export class TileController extends Component {


  render() {
    let colors = this.props.sectionColors;
    let isSelected = this.props.selectedQuadrant;
    return (
      <div className="quadTile">
        <ParentTile childrenColor={colors[0]} isSelected={isSelected[0]} id="0"/>
        <ParentTile childrenColor={colors[1]} isSelected={isSelected[1]} id="1"/>
        <ParentTile childrenColor={colors[2]} isSelected={isSelected[2]} id="2"/>
        <ParentTile childrenColor={colors[3]} isSelected={isSelected[3]} id="3"/>
      </div>
    )
  }
}
