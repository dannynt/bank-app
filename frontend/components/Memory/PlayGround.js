import React from "react";
import Card from "./Card";

export default class PlayGround extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      frameworks: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/UML_logo.svg/1200px-UML_logo.svg.png',
        'https://cdn2.iconfinder.com/data/icons/essential-web-5/50/organization-chart-diagram-hierachy-system-512.png',
        'https://image.flaticon.com/icons/png/512/554/554681.png',
        'https://miro.medium.com/max/3200/1*Dy26rdf322J_2AgM6mL7BA.png',
        'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/34857/business-persons-meeting-clipart-md.png',
        'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/35287/0012185-2-clipart-md.png'
      ],
      duplicatedFrameworks: [],
      randomizedFrameworks: [],
      finalizedFrameworks: [],
      openedFrameworks: []
    }
    this.start()
  }

  handleClick(name, index) {
    if (this.state.openedFrameworks.length == 2) {
      setTimeout(() => {
        this.check()
      }, 750)
    } else {
      let framework = {
        name,
        index
      }
      let finalizedFrameworks = this.state.finalizedFrameworks
      let frameworks = this.state.openedFrameworks
      finalizedFrameworks[index].close = false
      frameworks.push(framework)
      this.setState({
        openedFrameworks: frameworks,
        finalizedFrameworks: finalizedFrameworks
      })
      if (this.state.openedFrameworks.length == 2) {
        setTimeout(() => {
          this.check()
        }, 750)
      }
    }
  }

  check() {
    if (!this.state.openedFrameworks[1]) return
    let finalizedFrameworks = this.state.finalizedFrameworks
    if ((this.state.openedFrameworks[0].name == this.state.openedFrameworks[1].name) && (this.state.openedFrameworks[0].index != this.state.openedFrameworks[1].index)) {
      finalizedFrameworks[this.state.openedFrameworks[0].index].complete = true
      finalizedFrameworks[this.state.openedFrameworks[1].index].complete = true
    } else {
      finalizedFrameworks[this.state.openedFrameworks[0].index].close = true
      finalizedFrameworks[this.state.openedFrameworks[1].index].close = true
    }
    let gameEnded = true;
    for(let el of finalizedFrameworks) {
      gameEnded = gameEnded && el.complete;
    }

    if(gameEnded) {
      console.log('game finished');
      this.props.onFinish();
      this.start();
    } else {
      this.setState({
        finalizedFrameworks,
        openedFrameworks: []
      })
    }
  }

  start() {
    let finalizedFrameworks = [];
    this.state.duplicatedFrameworks = this.state.frameworks.concat(this.state.frameworks)
    this.state.randomizedFrameworks = this.shuffle(this.state.duplicatedFrameworks)
    this.state.randomizedFrameworks.map((name, index) => {
      finalizedFrameworks.push({
        name,
        close: true,
        complete: false,
        fail: false
      })
    })
    this.state.finalizedFrameworks = finalizedFrameworks
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array
  }

  render() {

    return (
        <div className="playground">
          {
            this.state.finalizedFrameworks.map((framework, index) => {
              return(
                  <Card
                      key={index}
                      framework={framework.name}
                      click={() => {this.handleClick(framework.name, index)}}
                      close={framework.close}
                      complete={framework.complete}
                  />
              )
            })
          }
        </div>
    )
  }
}