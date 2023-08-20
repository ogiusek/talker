// @ts-ignore
import { restUrl } from "src/utils";

let timeout: any;
const usernameRegex = /^[a-zA-Z0-9_.]{4,20}$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

function loginIsValid(login: string, setError: React.Dispatch<React.SetStateAction<string>>) {
  const isUsername = usernameRegex.test(login);
  const isEmail = emailRegex.test(login);
  if (isUsername === isEmail) {
    return setError("Enter email or username!");
  }
  if (isUsername) setError('Checking username');
  else setError('Checking email');

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const params = new URLSearchParams();
    const key = isEmail ? 'email' : 'username';
    params.append(key, login);
    fetch(`${restUrl}/isUsed/${key}?${params.toString()}`).then(response => response.json())
      .then((result: any) => {
        if (result.res) {
          setError('');
        } else {
          setError('Login do not exists');
        }
      });
  }, 300);
}

export { loginIsValid };
export default loginIsValid;