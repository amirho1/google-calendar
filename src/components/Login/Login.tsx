/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../hooks/useFetch";
import AuthInp from "../AuthInp/AuthInp";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router";
import Error from "../Error/Error";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onPasswordChange = useCallback((pass: string) => {
    setPassword(pass);
  }, []);

  const onEmailChange = useCallback((val: string) => {
    setEmail(val);
  }, []);
  const navigate = useNavigate();

  const onSubmit = useCallback(() => {
    const result = Api({
      url: "/login",
      data: { email, password },
      method: "POST",
    });

    result
      .then(() => {
        setError(null);
        navigate("/");
      })
      .catch(err => setError(err.message));
  }, [email, navigate, password]);

  return (
    <div className={styles.Login} data-testid="Login">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className={styles.Form}>
        <Logo />
        <h1>ورود به سیستم</h1>
        <p>از حساب Google خود استفاده کنید</p>

        <AuthInp
          type="email"
          htmlFor="email"
          label="ایمیل"
          onChange={onEmailChange}
          value={email}
          error={!!error}
          require={true}
        />
        <AuthInp
          type="password"
          htmlFor="password"
          label="رمز عبور"
          value={password}
          require={true}
          onChange={onPasswordChange}
          error={!!error}
        />
        <Error
          message={error ? "ایمیل یا پسورد وارد شده اشتباه است ." : null}
        />

        <a className={`link ${styles.disabled}`}>
          ایمیلتان را فراموش کرده‌اید؟
        </a>

        <p className={styles.NotYourPC}>
          رایانه شما نیست؟ برای ورود به سیستم، از «پنجره خصوصی» استفاده کنید.
        </p>

        <div className="f-between mt-3">
          <Link to="/register">
            <Button type="button" className="linkBtn">
              ایجاد حساب
            </Button>
          </Link>
          <Button type="submit" className="blueBtn">
            ورود
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
