import React, { PropTypes, Children, cloneElement } from 'react';

const getFirstTouch = (e) => e.touches[0] || {};
const getFirstChangedTouch = (e) => e.changedTouches[0] || {};

const getNormalisedValue = (e, prop) =>
  e[prop] || getFirstTouch(e)[prop] || getFirstChangedTouch(e)[prop];

const normaliseEvent = (e) => {
  const event = {
    clientX: getNormalisedValue(e, 'clientX'),
    clientY: getNormalisedValue(e, 'clientY'),
    pageX: getNormalisedValue(e, 'pageX'),
    originalEvent: e,
  };

  return event;
};

export class Draggable extends React.Component {
  constructor(props) {
    super(props);

    this.mouseUp = false;
    this.dragging = false;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.event = {};
    this.savedValues = {};
  }

  onMouseDown(e) {
    const event = normaliseEvent(e);
    this.savedValues = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    this.event = {
      startPointerX: event.clientX,
      startPointerY: event.clientY,
    };
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('touchmove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchend', this.onMouseUp);

    this.props.onStart(event, this.event);
  }

  onMouseMove(e) {
    if (!this.dragging) {
      this.dragging = true;
    }
    e.preventDefault();
    const event = normaliseEvent(e);

    this.event = Object.assign(this.event, {
      deltaStartPointerX: event.clientX - this.event.startPointerX,
      deltaStartPointerY: event.clientY - this.event.startPointerY,
      deltaLastPointerX: event.clientX - this.savedValues.clientX,
      deltaLastPointerY: event.clientY - this.savedValues.clientY,
    });

    this.savedValues = {
      clientX: event.clientX,
      clientY: event.clientY,
    };

    this.props.onDrag(event, this.event);
  }

  onMouseUp(e) {
    const event = normaliseEvent(e);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('touchend', this.onMouseUp);

    this.props.onStop(event);
    this.dragging = false;
  }

  render() {
    let child = Children.only(this.props.children);
    if (this.props.isActive) {
      child = cloneElement(child, {
        onMouseDown: this.onMouseDown,
        onTouchStart: this.onMouseDown,
      });
    }

    return child;
  }
}

Draggable.propTypes = {
  onStart: PropTypes.func.isRequired,
  onDrag: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  isActive: PropTypes.bool,
};

Draggable.defaultProps = {
  isActive: true,
  onStart: () => {},
  onStop: () => {},
};
