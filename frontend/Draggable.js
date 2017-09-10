/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @flow
 */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
import type {DOMEvent} from './types';

type Props = {
  children?: any,
  onMove: (x: number, y: number) => void,
  onStart: () => void,
  onStop: () => void,
  style: Object,
};

class Draggable extends React.Component<Props> {
  _onMove: (event: MouseEvent) => mixed;
  _onUp: (event: MouseEvent) => mixed;

  componentDidMount() {
    this._onMove = this.onMove.bind(this);
    this._onUp = this.onUp.bind(this);
  }

  _startDragging(evt: DOMEvent) {
    evt.preventDefault();
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      var doc = domNode.ownerDocument;
      doc.addEventListener('mousemove', this._onMove);
      doc.addEventListener('mouseup', this._onUp);
      this.props.onStart();
    }
  }

  onMove(evt: MouseEvent) {
    evt.preventDefault();
    this.props.onMove(evt.pageX, evt.pageY);
  }

  onUp(evt: MouseEvent) {
    evt.preventDefault();
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      var doc = domNode.ownerDocument;
      doc.removeEventListener('mousemove', this._onMove);
      doc.removeEventListener('mouseup', this._onUp);
      this.props.onStop();
    }
  }

  render() {
    return (
      <div
        style={this.props.style}
        onMouseDown={this._startDragging.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }
}

module.exports = Draggable;
