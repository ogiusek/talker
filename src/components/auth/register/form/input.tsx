import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

import { Input, BlurOnHover } from "../../components";
import { Link } from "stupid-react-router";

interface IInputRouteProps {
  setInput: React.Dispatch<React.SetStateAction<string>>,
  getError: (email: string, setError: React.Dispatch<React.SetStateAction<string>>, usedToLogin: boolean) => any,
  placeholder: string,
  type?: "text" | "password",
  prevPath?: string,
  nextPath?: string,
}

function InputRoute({ setInput, getError, placeholder, type = "text", prevPath = '', nextPath = '' }: IInputRouteProps) {
  const [error, setError] = useState<string>('To short');

  useEffect(() => {
    setInput('');
  }, [setInput]);

  return (<React.Fragment>
    <Input placeholder={placeholder} type={type} setInput={(val: string) => {
      setInput(val);
      getError(val, setError, false);
    }} errorText={error} />
    <br />
    {nextPath.length > 0 && <BlurOnHover>
      <Link to={nextPath} style={{ 'pointerEvents': ((!!error) ? 'none' : "all") }}
        disabled={!!error} className={style['button']}>Continue</Link>
    </BlurOnHover>}
    {prevPath.length > 0 && <BlurOnHover>
      <Link to={prevPath} className={style['button']}>Previous</Link>
    </BlurOnHover>}
  </React.Fragment>);
}

export { InputRoute };
export default InputRoute;