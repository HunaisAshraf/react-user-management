export type ReactSetState = React.Dispatch<React.SetStateAction<string>>;

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  token: string;
  img: string;
};

export type AuthData = {
  user?: User | null;
  admin?: User | null;
};

export type ErrorType = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};
