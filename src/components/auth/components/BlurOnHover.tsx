import React from "react";
import CSS from 'csstype';

interface IBlurOnHoverProps {
  children?: any,
  className?: string,
  style?: CSS.Properties
}

function BlurOnHover({ children, className = '', style = {} }: IBlurOnHoverProps) {
  return (<div onMouseEnter={() => {
    const activeElement = document.activeElement as HTMLElement;
    activeElement?.blur();
  }} className={className} style={style}>
    {children}
  </div>);
}

export { BlurOnHover };
export default BlurOnHover;