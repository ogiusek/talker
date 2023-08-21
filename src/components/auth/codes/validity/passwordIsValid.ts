const passwordRegex = /^.{6,24}$/;

function passwordIsValid(password: string, setError: React.Dispatch<React.SetStateAction<string>>) {
  if (!passwordRegex.test(password)) {
    setError("6-24 character's");
  } else {
    setError('');
  }
}

export { passwordIsValid };
export default passwordIsValid;