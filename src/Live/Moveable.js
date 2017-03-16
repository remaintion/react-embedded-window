import React, { PropTypes } from 'react';
import close from './components/close';
import move from './components/move';

class Moveable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iframe: props.iframe || '',
      position: {
        x: 0, y: 0,
      },
      width: 300,
      deltaWidth: 0,
      activeButton: false,
      isHidden: false,
    };
    this.handleDrag = this.handleDrag.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      iframe: nextProps.iframe,
    });
  }
  handleDrag(e) {
    this.setState({ position: { x: e.clientX, y: e.clientY } });
  }
  render() {
    if (this.state.iframe === '') return (<div></div>);
    const { iframe } = this.state;
    const { x, y } = this.state.position;
    const url = iframe.match(/src="([^\s]+)"/g)[0].replace(/src=/, '').replace(/"/g, '');
    const width = iframe.match(/width="([^\s]+)"/g)[0].match(/\d+/g);
    const height = iframe.match(/height="([^\s]+)"/g)[0].match(/\d+/g);
    const ratio = height / width;
    if (this.state.isHidden) {
      return (
        <div
          onClick={() => this.setState({ isHidden: false })}
          style={{
            position: 'fixed',
            bottom: 0,
            right: 50,
            background: '#3260ff',
            width: 300,
            padding: 15,
            textAlign: 'center',
            verticalAlign: 'middle',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            color: '#fff',
            cursor: 'pointer',
          }}
          >
          SHOW
        </div>
      );
    }
    return (
      <div
        onMouseOver={() => this.setState({ activeButton: true })}
        onMouseLeave={() => this.setState({ activeButton: false })}
        >
        {this.state.activeButton && <div
          draggable
          onDrag={this.handleDrag}
          style={{ cursor: 'move', position: 'fixed', top: y, left: x, zIndex: 300, width: 200 }}
          >
          <img role="presentation" src={move} />
        </div>}
        <div
          draggable
          style={{
            cursor: 'col-resize',
            position: 'fixed',
            top: y + 40,
            left: this.state.activeMoveLeft ? x - 25 : x,
            height: this.state.width * ratio - 40,
            width: this.state.activeMoveLeft ? 50 : 6,
            zIndex: 9999,
          }}
          onDragStart={e => this.setState({ oldX: e.clientX, deltaWidth: this.state.width - e.clientX, activeMoveLeft: true, temp: { ...this.state.position, oldWidth: this.state.width } })}
          onDrag={e => {
            const deltaX = this.state.oldX - e.clientX;
            const absX = Math.abs(deltaX);
            if (deltaX >= 0) {
              this.setState({
                width: deltaX + this.state.temp.oldWidth,
                position: {
                  x: this.state.temp.x - absX,
                  y: this.state.temp.y,
                },
              });
            } else {
              this.setState({
                width: deltaX + this.state.temp.oldWidth,
                position: {
                  x: this.state.temp.x + absX,
                  y: this.state.temp.y,
                },
              });
            }
          }}
          onDragEnd={() => this.setState({ activeMoveLeft: false })}
          >
        </div>
        <iframe
          draggable
          src={url}
          style={{ border: 'none', position: 'fixed', top: y, left: x, width: this.state.width, zIndex: 1 }}
          width={this.state.width}
          height={this.state.width * ratio}
          frameBorder={0}
          allowTransparency
          ></iframe>
        <div
          draggable
          style={{
            cursor: 'col-resize',
            position: 'fixed',
            top: y,
            left: this.state.activeMoveRight ? this.state.width + x - 25 : this.state.width + x,
            height: this.state.width * ratio,
            width: this.state.activeMoveRight ? 50 : 6,
            zIndex: 9999,
          }}
          onDragStart={e => this.setState({ deltaWidth: this.state.width - e.clientX, activeMoveRight: true })}
          onDrag={e => this.setState({ width: e.clientX + this.state.deltaWidth })}
          onDragEnd={() => this.setState({ activeMoveRight: false })}
          >
        </div>
        {this.state.activeButton && <div
          style={{ cursor: 'pointer', position: 'fixed', top: y - 5, left: this.state.width + x - 30, width: 200, zIndex: 9999 }}
          onClick={() => this.setState({ isHidden: true })}
          >
          <img role="presentation" src={close} />
        </div>}
      </div>
    );
  }
}
Moveable.propTypes = {
  iframe: PropTypes.string,
}

export default Moveable;
