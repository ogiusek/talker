import React, { useRef, useState } from "react";
import style from "./style.module.scss";

interface IInputProps {
  placeholder: string,
  name?: string,

  setInput: React.Dispatch<React.SetStateAction<string>> | ((val: string) => any),

  errorText: string,

  type?: "text" | "password",
}

function Input({ placeholder, name = "", type = "text",
  errorText, setInput }: IInputProps) {

  const inputRef = useRef<HTMLInputElement>(null);
  const [refresher, setRefresher] = useState<boolean | undefined>(undefined);

  const errorOccured = errorText !== '';
  const showError = errorOccured && refresher !== undefined && inputRef.current !== document.activeElement;

  const handleInputEvents = (e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    setRefresher(!refresher);
  }

  return (<React.Fragment>
    <input className={style['input']} ref={inputRef} placeholder={placeholder} name={name} type={type} onKeyDown={event => {
      if (event.key === "Enter") {
        const activeElement = document.activeElement as HTMLElement;
        activeElement?.blur();
      }
    }}
      onChange={handleInputEvents} onFocus={handleInputEvents} onBlur={handleInputEvents} />

    <span style={{ opacity: showError ? 1 : 0 }} className={style['error']}>{errorText}</span>
  </React.Fragment>);
}

export { Input };
export default Input;