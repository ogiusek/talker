import React from "react";
import style from "./style.module.scss";

interface ISectionProps {
  children?: any,
  className?: string
}

function Section({ children, className = '' }: ISectionProps) {
  return (<section className={`${style['section']} ${className}`}>
    {children}
  </section>);
}

export { Section };
export default Section;