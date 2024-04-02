import { ErrorType } from "./type";

export const API_URl = "http://localhost:3000/api/";

export const validateForm = (data: any) => {
  let error: ErrorType = { name: "", email: "", phone: "", password: "" };
  let containError = false;

  const { name, email, phone, password, confirmPassword } = data;

  if (name && !/^([a-zA-Z ]){2,30}$/.test(name)) {
    error.name = "invalid format";
    containError = true;
  }
  if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    error.email = "invalid email";
    containError = true;
  }
  if (phone && !/^\d{10}$/.test(phone)) {
    error.phone = "Invalid phone number";
    containError = true;
  }
  if (
    password &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/.test(password)
  ) {
    error.password =
      "password should contail uppercase, lowercase, number and special characters";
    containError = true;
  }
  if (confirmPassword && confirmPassword !== password) {
    error.confirmPassword = "password dosen't match";
    containError = true;
  }

  return { error, notValid: containError };
};
