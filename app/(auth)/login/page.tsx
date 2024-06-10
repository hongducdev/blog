import { Metadata } from "next";
import LoginForm from "./_component/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login with your GitHub account to continue",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
