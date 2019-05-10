import React, { Component } from 'react';

import { TileController } from './Components/TileController';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[true, true, true, true], [true, true, true, true], [true, true, true, true], [true, true, true, true]],
      isSelected: false,
      selectedQuadrant: [false, false, false, false]
    }

    this.moveLeft = this.moveLeft.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveRight = this.moveRight.bind(this);

    this.makeSelected = this.makeSelected.bind(this);

    this.mixTiles = this.mixTiles.bind(this);
  }

moveLeft = (e) => {
  // 1 -> 0 | 3 -> 2
  let data = this.state.data;
  if(this.state.isSelected) {

  data[0] = submerge(data[1], data[0]);
  data[2] = submerge(data[3], data[2]);

} else {
  let index = this.state.selectedQuadrant.indexOf(true);
  data[index] = submergeSingle(data[index], "L");
}
  this.setState({
    data: data
  })
  this.forceUpdate();
}

moveUp = (e) => {
  // 2 -> 0 | 3 -> 1
  let data = this.state.data;
  if(this.state.isSelected) {
    data[0] = submerge(data[2], data[0]);
    data[1] = submerge(data[3], data[1]);
  } else {
    let index = this.state.selectedQuadrant.indexOf(true);
    data[index] = submergeSingle(data[index], "U");
  }
this.setState({
    data: data
  })
  this.forceUpdate();
}

moveDown = (e) => {
  // 0 -> 2 | 1 -> 3
  let data = this.state.data;
  if(this.state.isSelected) {
    data[2] = submerge(data[0], data[2]);
    data[3] = submerge(data[1], data[3]);
} else {
  let index = this.state.selectedQuadrant.indexOf(true);
  data[index] = submergeSingle(data[index], "D");
}
  this.setState({
    data: data
  })
  this.forceUpdate();
}

moveRight = (e) => {
  // 0 -> 1 | 2 -> 3
  let data = this.state.data;
  if(this.state.isSelected) {
    data[1] = submerge(data[0], data[1]);
    data[3] = submerge(data[2], data[3]);
} else {
  let index = this.state.selectedQuadrant.indexOf(true);
  data[index] = submergeSingle(data[index], "R");
}
  this.setState({
    data: data
  })
  this.forceUpdate();
}

makeSelected = (e) => {
  if(e.shiftKey) {
    let currentState = this.state.isSelected;
    this.setState({
      isSelected: !currentState,
      selectedQuadrant: [false, false, false, false]
    });
  } else {
    let id = e.target.parentNode.id;
    let selectedQuadrant = [false, false, false, false];
    selectedQuadrant[id] = true;

    this.setState({
      isSelected: false,
      selectedQuadrant: selectedQuadrant
    })
  }
}

//  Create input for number of mixes
mixTiles = (e) => {
  let data = mixer();

  this.setState({
    data: data
  })
}


  render() {
    let data = this.state.data;
    let selected = this.state.isSelected ? "selected" : "";
    return (
    <div className="main">
      <div className={`game ${selected}`} onClick={this.makeSelected}>
        <TileController sectionColors={data} selectedQuadrant={this.state.selectedQuadrant}/>
      </div>
      <div className="buttons">
        <button onClick={this.moveLeft} ref="left">Left</button>
        <button onClick={this.moveUp} ref="up">Up</button>
        <button onClick={this.moveDown} ref="down">Down</button>
        <button onClick={this.moveRight} ref="right">Right</button>
      </div>
        <button onClick={this.mixTiles}>Mix</button>
    </div>
    );
  }
}

function submerge(arr1, arr2) {
  let output = [];
  arr1.forEach((element, i) => {
    let result = element > arr2[i];
    if(element === false && arr2[i] === false) {
      result = !result;
    }
    output.push(result);
  })
  return output;
}

// HARDCODED
function submergeSingle(arr, dir) {
  let output = arr;
  if(dir === "L") {
    let firstTile = arr[1] > arr[0]
    if(arr[1] === false && arr[0] === false) {
      firstTile = !firstTile;
    }
    let secondTile = arr[3] > arr[2]
    if(arr[3] === false && arr[2] === false) {
      secondTile = !secondTile;
    }
    output[0] = firstTile;
    output[2] = secondTile;
  } else if(dir === "R") {
    let firstTile = arr[0] > arr[1]
    if(arr[1] === false && arr[0] === false) {
      firstTile = !firstTile;
    }
    let secondTile = arr[2] > arr[3]
    if(arr[3] === false && arr[2] === false) {
      secondTile = !secondTile;
    }
    output[1] = firstTile;
    output[3] = secondTile;
  } else if(dir === "U") {
    let firstTile = arr[2] > arr[0]
    if(arr[2] === false && arr[0] === false) {
      firstTile = !firstTile;
    }
    let secondTile = arr[3] > arr[1]
    if(arr[3] === false && arr[2] === false) {
      secondTile = !secondTile;
    }
    output[0] = firstTile;
    output[1] = secondTile;
  } else if(dir === "D") {
    let firstTile = arr[0] > arr[2]
    if(arr[2] === false && arr[0] === false) {
      firstTile = !firstTile;
    }
    let secondTile = arr[1] > arr[3]
    if(arr[3] === false && arr[1] === false) {
      secondTile = !secondTile;
    }
    output[2] = firstTile;
    output[3] = secondTile;
  }
  return output;
}

function mixer() {
  let data = [[true, true, true, true], [true, true, true, true], [true, true, true, true], [true, true, true, true]];

for(let i = 0; i < 10; i++){
  let random = Math.floor(Math.random() * 5);
  if(random === 4) {
    let next = Math.floor(Math.random() * 4);
    if(next === 0) {
      data[0] = submerge(data[1], data[0]);
      data[2] = submerge(data[3], data[2]);
    } else if(next === 1) {
      data[0] = submerge(data[2], data[0]);
      data[1] = submerge(data[3], data[1]);
    } else if(next === 2) {
      data[2] = submerge(data[0], data[2]);
      data[3] = submerge(data[1], data[3]);
    } else if(next === 3) {
      data[1] = submerge(data[0], data[1]);
      data[3] = submerge(data[2], data[3]);
    }
  } else {
    let direction = Math.floor(Math.random() * 4);
    if(direction === 0) {
      data[random] = submergeSingle(data[random], "L");
    } else if(direction === 1) {
      data[random] = submergeSingle(data[random], "D");
    } else if(direction === 2) {
      data[random] = submergeSingle(data[random], "U");
    } else if(direction === 3) {
      data[random] = submergeSingle(data[random], "R");
    }
  }
}
  return data;
}

export default App;
