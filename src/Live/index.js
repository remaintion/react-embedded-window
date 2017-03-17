import React, { PropTypes } from 'react';
import close from './components/close';
import Moveable from './Moveable';
const positions = {
  top: {
    top: 42,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  bottom: {
    bottom: 0,
  },
};
class Live extends React.Component {
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
      position: nextProps.position,
    });
  }
  handleDrag(e) {
    this.setState({ position: { x: e.clientX, y: e.clientY } });
  }
  render() {
    if (this.state.iframe === '') return (<div></div>);
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
    const { iframe } = this.state;
    if (this.props.moveable) return <Moveable {...this.props} />
    const url = iframe.match(/src="([^\s]+)"/g)[0].replace(/src=/, '').replace(/"/g, '');
    const width = iframe.match(/width="([^\s]+)"/g)[0].match(/\d+/g);
    const height = iframe.match(/height="([^\s]+)"/g)[0].match(/\d+/g);
    const ratio = height / width;
    const styles = this.props.position.split(' ').map(pos => positions[pos]).reduce((p, c) => Object.assign({}, p, c), {});
    return (
      <div
        onMouseOver={() => this.setState({ activeButton: true })}
        onMouseLeave={() => this.setState({ activeButton: false })}
        style={{
          ...styles,
          position: 'fixed',
          zIndex: 10000000000,
          height: this.state.width * ratio,
        }}
        >
        <div
          draggable
          style={{
            cursor: 'col-resize',
            position: 'absolute',
            height: '100%',
            left: -1,
            width: this.state.activeMoveLeft ? 50 : 6,
            zIndex: 10000000001,
          }}
          onDragStart={e => this.setState({ oldX: e.clientX, deltaWidth: this.state.width - e.clientX, activeMoveLeft: true, temp: { oldWidth: this.state.width } })}
          onDrag={e => {
            const deltaX = this.state.oldX - e.clientX;
            if (deltaX >= 0) {
              this.setState({
                width: deltaX + this.state.temp.oldWidth,
              });
            } else {
              this.setState({
                width: deltaX + this.state.temp.oldWidth,
              });
            }
          }}
          onDragEnd={() => this.setState({ activeMoveLeft: false })}
          >
        </div>
        <iframe
          draggable
          src={url}
          style={{ border: 'none', zIndex: 1 }}
          width={this.state.width}
          height={this.state.width * ratio}
          frameBorder={0}
          allowTransparency
          ></iframe>
        <div
          draggable
          style={{
            cursor: 'col-resize',
            position: 'absolute',
            height: '100%',
            top: 0,
            right: -1,
            width: this.state.activeMoveRight ? 50 : 6,
            zIndex: 10000000001,
          }}
          onDragStart={e => this.setState({ deltaWidth: this.state.width - e.clientX, activeMoveRight: true })}
          onDrag={e => this.setState({ width: e.clientX + this.state.deltaWidth })}
          onDragEnd={() => this.setState({ activeMoveRight: false })}
          >
        </div>
        {this.state.activeButton && <div
          style={{ position: 'absolute', cursor: 'pointer', top: 5, left: 5, width: '100%', zIndex: 9999 }}
          onClick={() => this.setState({ isHidden: true })}
          >
          <img role="presentation" src={close} />
        </div>}
      </div>
    );
  }
}
Live.propTypes = {
  iframe: PropTypes.string,
  position: PropTypes.string,
  moveable: PropTypes.bool,
};

export default Live;
