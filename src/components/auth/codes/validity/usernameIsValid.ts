import { restUrl } from "src/utils";

let timeout: any;
const usernameRegex = /^[a-zA-Z0-9_.]{4,20}$/;

function usernameIsValid(username: string, setError: React.Dispatch<React.SetStateAction<string>>, usedToLogin: boolean = false) {
  if (!usernameRegex.test(username)) {
    setError("4-20 characters, no special characters.");
  } else {
    setError('Checking username');

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const params = new URLSearchParams();
      params.append('username', username);
      fetch(`${restUrl}/isUsed/username?${params.toString()}`).then(response => response.json())
        .then((result: any) => {
          if (!result.res === usedToLogin) {
            if (usedToLogin) {
              setError('This username do not exists!');
            } else {
              setError('This username is used!');
            }
          } else {
            setError('');
          }
        });
    }, 300);
  }
}

export { usernameIsValid };
export default usernameIsValid;