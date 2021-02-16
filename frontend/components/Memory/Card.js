import React from "react";

export default class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  clicked(framework) {
    this.props.click(framework)
  }

  render() {
    return (
        <div className={"memoryCard" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')}
             onClick={() => this.clicked(this.props.framework)}>
          <div className="front">
            ?
          </div>
          <div className="back">
            <img
                src={this.props.framework}/>
          </div>
        </div>
    )
  }
}