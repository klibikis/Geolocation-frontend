import styles from "./Login.page.module.scss";
import LoginForm from "../../assets/Components/LoginForm/LoginForm";

const LoginPage = () => {

  return (
    <div className={`${styles.formContainer} ${styles.background}`}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
