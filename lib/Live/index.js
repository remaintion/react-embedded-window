'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _close = require('./components/close');

var _close2 = _interopRequireDefault(_close);

var _move = require('./components/move');

var _move2 = _interopRequireDefault(_move);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Live = function (_React$Component) {
  _inherits(Live, _React$Component);

  function Live(props) {
    _classCallCheck(this, Live);

    var _this = _possibleConstructorReturn(this, (Live.__proto__ || Object.getPrototypeOf(Live)).call(this, props));

    _this.state = {
      iframe: props.iframe || '',
      position: {
        x: 0, y: 0
      },
      width: 300,
      deltaWidth: 0,
      activeButton: false,
      isHidden: false
    };
    _this.handleDrag = _this.handleDrag.bind(_this);
    return _this;
  }

  _createClass(Live, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        iframe: nextProps.iframe
      });
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(e) {
      this.setState({ position: { x: e.clientX, y: e.clientY } });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (this.state.iframe === '') return _react2.default.createElement('div', null);
      var iframe = this.state.iframe;
      var _state$position = this.state.position,
          x = _state$position.x,
          y = _state$position.y;

      var url = iframe.match(/src="([^\s]+)"/g)[0].replace(/src=/, '').replace(/"/g, '');
      var width = iframe.match(/width="([^\s]+)"/g)[0].match(/\d+/g);
      var height = iframe.match(/height="([^\s]+)"/g)[0].match(/\d+/g);
      var ratio = height / width;
      if (this.state.isHidden) {
        return _react2.default.createElement(
          'div',
          {
            onClick: function onClick() {
              return _this2.setState({ isHidden: false });
            },
            style: {
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
              cursor: 'pointer'
            }
          },
          'SHOW'
        );
      }
      return _react2.default.createElement(
        'div',
        {
          onMouseOver: function onMouseOver() {
            return _this2.setState({ activeButton: true });
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.setState({ activeButton: false });
          }
        },
        this.state.activeButton && _react2.default.createElement(
          'div',
          {
            draggable: true,
            onDrag: this.handleDrag,
            style: { cursor: 'move', position: 'fixed', top: y, left: x, zIndex: 300, width: 200 }
          },
          _react2.default.createElement('img', { role: 'presentation', src: _move2.default })
        ),
        _react2.default.createElement('div', {
          draggable: true,
          style: {
            cursor: 'col-resize',
            position: 'fixed',
            top: y + 40,
            left: this.state.activeMoveLeft ? x - 25 : x,
            height: this.state.width * ratio - 40,
            width: this.state.activeMoveLeft ? 50 : 6,
            zIndex: 9999
          },
          onDragStart: function onDragStart(e) {
            return _this2.setState({ oldX: e.clientX, deltaWidth: _this2.state.width - e.clientX, activeMoveLeft: true, temp: _extends({}, _this2.state.position, { oldWidth: _this2.state.width }) });
          },
          onDrag: function onDrag(e) {
            var deltaX = _this2.state.oldX - e.clientX;
            var absX = Math.abs(deltaX);
            if (deltaX >= 0) {
              _this2.setState({
                width: deltaX + _this2.state.temp.oldWidth,
                position: {
                  x: _this2.state.temp.x - absX,
                  y: _this2.state.temp.y
                }
              });
            } else {
              _this2.setState({
                width: deltaX + _this2.state.temp.oldWidth,
                position: {
                  x: _this2.state.temp.x + absX,
                  y: _this2.state.temp.y
                }
              });
            }
          },
          onDragEnd: function onDragEnd() {
            return _this2.setState({ activeMoveLeft: false });
          }
        }),
        _react2.default.createElement('iframe', {
          draggable: true,
          src: url,
          style: { border: 'none', position: 'fixed', top: y, left: x, width: this.state.width },
          width: this.state.width,
          height: this.state.width * ratio,
          frameBorder: 0,
          allowTransparency: true
        }),
        _react2.default.createElement('div', {
          draggable: true,
          style: {
            cursor: 'col-resize',
            position: 'fixed',
            top: y,
            left: this.state.activeMoveRight ? this.state.width + x - 25 : this.state.width + x,
            height: this.state.width * ratio,
            width: this.state.activeMoveRight ? 50 : 6,
            zIndex: 9999
          },
          onDragStart: function onDragStart(e) {
            return _this2.setState({ deltaWidth: _this2.state.width - e.clientX, activeMoveRight: true });
          },
          onDrag: function onDrag(e) {
            return _this2.setState({ width: e.clientX + _this2.state.deltaWidth });
          },
          onDragEnd: function onDragEnd() {
            return _this2.setState({ activeMoveRight: false });
          }
        }),
        this.state.activeButton && _react2.default.createElement(
          'div',
          {
            style: { cursor: 'pointer', position: 'fixed', top: y - 5, left: this.state.width + x - 30, width: 200, zIndex: 9999 },
            onClick: function onClick() {
              return _this2.setState({ isHidden: true });
            }
          },
          _react2.default.createElement('img', { role: 'presentation', src: _close2.default })
        )
      );
    }
  }]);

  return Live;
}(_react2.default.Component);

Live.propTypes = {
  iframe: _react.PropTypes.string
};

exports.default = Live;