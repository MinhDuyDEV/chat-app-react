import RegisterForm from "../components/forms/RegisterForm";
import { Page } from "../utils/styles";

const RegisterPage = () => {
  return (
    <Page display='flex' justifycontent='center' alignitems='center'>
      <RegisterForm />
    </Page>
  );
};

export default RegisterPage;
