export default function validateSignUp(values) {
  const errors = {};
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (values.username.length < 6 || values.username.length > 20) {
    errors.username = "Username must be 6 to 20 characters long";
  } else if (!/^[a-z0-9]+$/i.test(values.username)) {
    errors.username = "Username must be alphanumeric";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Password must be 8 to 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Password must not contain spaces";
  }
  return errors;
}
