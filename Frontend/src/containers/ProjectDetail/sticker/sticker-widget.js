import React, { Component } from 'react';
import { StickerWidgetWrapper } from './style';
import { Icon } from 'antd';

export default class extends Component {
  render() {
    const { fontColor, bgColor, width, icon, number, text } = this.props;
    console.log(icon)

    const textColor = {
      color: fontColor
    };
    const widgetStyle = {
      backgroundColor: bgColor,
      width: width
    };
    const iconStyle = {
      color: fontColor
    };

    return (
      <StickerWidgetWrapper className="isoStickerWidget" style={widgetStyle}>
        <div className="isoIconWrapper">
        <Icon type={icon} style={iconStyle} />
          {/* <i className={icon} style={iconStyle} /> */}
        </div>

        <div className="isoContentWrapper">
          <h3 className="isoStatNumber" style={textColor}>
            {number}
          </h3>
          <span className="isoLabel" style={textColor}>
            {text}
          </span>
        </div>
      </StickerWidgetWrapper>
    );
  }
}
