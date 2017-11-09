import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import Video from './components/Video';
import Overlay from './components/Overlay';
import Categories from './components/Categories';
import styles from './index.css';

export default class LandingBackground extends Component {
  state = {};

  handleCursorPositionChange = (cursorPosition) => {
    this.setState({
      cursorPosition,
    });
  }

  render() {
    const { cursorPosition } = this.state;
    let dynamicOverlayStyles = {};

    if (cursorPosition) {
      const splitWindowWidth = window.innerWidth / 2;

      const coordinates = cursorPosition.position;
      const maxPercentage = 1;
      const positionPercentage = (coordinates.x / splitWindowWidth) * maxPercentage;
      const leftPositionPercentage = maxPercentage - positionPercentage;
      const rightPositionPercentage = positionPercentage - maxPercentage;
      
      dynamicOverlayStyles = {
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, ${rightPositionPercentage}) 45%, rgba(0, 0, 0, ${leftPositionPercentage}) 55%)`,
      };
    }

    return (
      <div>
        <Video />
        <ReactCursorPosition onPositionChanged={this.handleCursorPositionChange} className={styles.wrapper}>
          <Categories playingVideo={this.props.playingVideo} />
          <Overlay dynamicOverlayStyles={dynamicOverlayStyles} />
        </ReactCursorPosition>
      </div>
    );
  }
}
