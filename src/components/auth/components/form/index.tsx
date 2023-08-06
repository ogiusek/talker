import React from "react";
import style from "./style.module.scss";

interface IFormProps {
  onSubmit: (e: React.FormEvent) => any,
  children?: any
}

function Form({ onSubmit, children }: IFormProps) {
  return (<form className={style['form']} onSubmit={(e) => {
    e.preventDefault();
    onSubmit(e);
  }}>
    {children}
  </form>);
}

export { Form };
export default Form;