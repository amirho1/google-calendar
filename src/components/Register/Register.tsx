import React, { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import EmailValidator from "email-validator";
import { preventDefault } from "../../utils/helpers";
import AuthInp from "../AuthInp/AuthInp";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import Error from "../Error/Error";
import Logo from "../Logo/Logo";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailUnique, setIsEmailUnique] = useState<boolean | undefined>();
  const [nameAndLastNameErrorsMSG, setNameAndLastNameErrorsMSG] = useState<
    string | undefined
  >(undefined);
  const [lastNameErrors, setLastNameErrors] = useState<boolean>(false);
  const [nameError, setNameError] = useState(false);

  const [passwordErrorMsg, setPasswordErrorMsg] = useState<
    string | undefined
  >();
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPassError, setRepeatPassError] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState<string | undefined>();

  const changeShowPassword = useCallback(
    () => setShowPassword(current => !current),
    []
  );

  const { fetch } = useFetch({
    url: "/register",
    method: "POST",
    firstFetch: false,
  });

  const navigate = useNavigate();

  const validate = useCallback(
    (
      name: string,
      lastName: string,
      password: string,
      repeatPass: string,
      email: string
    ) => {
      setNameAndLastNameErrorsMSG(undefined);
      setLastNameErrors(false);
      setNameError(false);
      setPasswordErrorMsg(undefined);
      setPasswordError(false);
      setRepeatPassError(false);
      setEmailErrorMsg(undefined);

      let valid = true;
      if (!name && !lastName) {
        setNameAndLastNameErrorsMSG("نام ونام خانوادگی را وارد کنید");
        setLastNameErrors(true);
        setNameError(true);
        valid = false;
      } else if (!name) {
        setNameAndLastNameErrorsMSG("نامتان را وارد کنید");
        setNameError(true);
        valid = false;
      } else if (!lastName) {
        setNameAndLastNameErrorsMSG("نام خانوادگی‌تان را وارد کنید");
        setLastNameErrors(true);
        valid = false;
      }
      if (!password) {
        valid = false;
        setPasswordErrorMsg("یک گذرواژه وارد کنید");
        setPasswordError(true);
      } else if (repeatPass !== password) {
        valid = false;
        setPasswordErrorMsg("گذرواژه‌ها مطابقت نداشتند. دوباره امتحان کنید.");
        setRepeatPassError(true);
      }

      if (!email) {
        setEmailErrorMsg("یک نشانی Gmail انتخاب کنید");
        valid = false;
      } else if (!EmailValidator.validate(email)) {
        setEmailErrorMsg("ایمیل وارد شده صحیح نست");
        valid = false;
      } else if (isEmailUnique === false) {
        setEmailErrorMsg("حساب کاربری دیگری با این ایمیل وجود دارد.");
        valid = false;
      }
      return valid;
    },
    [isEmailUnique]
  );

  const registerUser = useCallback(() => {
    if (validate(name, lastName, password, repeatPassword, email))
      fetch({
        data: { name, email, lastName, password },
      })
        .then(data => {
          navigate("/login");
        })
        .catch(console.error);
  }, [
    validate,
    name,
    lastName,
    password,
    repeatPassword,
    email,
    fetch,
    navigate,
  ]);

  const getIsEmailUnique = useCallback(
    email => {
      fetch({ url: `/register/isEmailUnique/${email}`, method: "GET" }).then(
        (data: any) => {
          if (!data.data) {
            setEmailErrorMsg("حساب کاربری دیگری با این ایمیل وجود دارد.");
            setIsEmailUnique(false);
          } else {
            setIsEmailUnique(true);
            setEmailErrorMsg(undefined);
          }
        }
      );
    },
    [fetch]
  );

  return (
    <div
      className={styles.Register}
      data-testid="Register"
      onSubmit={preventDefault}>
      <form className={`${styles.form} owl-mtop`}>
        <Logo />
        <h1>حساب Google خود را بسازید</h1>

        <div className={`owl-mtop ${styles.twoInp}`}>
          <AuthInp
            htmlFor="name"
            label="نام"
            onChange={setName}
            value={name}
            type="text"
            error={nameError}
          />
          <AuthInp
            htmlFor="lastName"
            label="نام خانوادگی"
            onChange={setLastName}
            value={lastName}
            type="text"
            error={lastNameErrors}
          />
        </div>
        <Error message={nameAndLastNameErrorsMSG} />
        <div className={styles.email}>
          <AuthInp
            value={email}
            onChange={setEmail}
            htmlFor="email"
            type="email"
            label="ایمیل"
            error={!!emailErrorMsg}
            onBlur={e => getIsEmailUnique(e.currentTarget.value)}
          />
        </div>
        <Error message={emailErrorMsg} />

        <div className={`owl-mtop ${styles.twoInp}`}>
          <AuthInp
            value={password}
            onChange={setPassword}
            htmlFor="password"
            type={showPassword ? "text" : "password"}
            label="گذرواژه"
            error={passwordError}
          />
          <AuthInp
            value={repeatPassword}
            onChange={setRepeatPassword}
            htmlFor="repeatPassword"
            type={showPassword ? "text" : "password"}
            label="تکرار گذرواژه"
            error={repeatPassError}
          />
        </div>
        <Error message={passwordErrorMsg} />
        <p className="sf-size">
          از ۸ نویسه یا بیشتر استفاده کنید، ترکیبی از حرف و عدد و نماد
        </p>

        <div className="f-between fit-content">
          <Checkbox
            color="gray"
            onChange={changeShowPassword}
            value={showPassword}
          />
          <span>نمایش گذرواژه</span>
        </div>

        <div className="f-between p1">
          <Link to={"/login"}>
            <Button type="button" className="linkBtn">
              در عوض به سیستم وارد شوید.
            </Button>
          </Link>
          <Button
            type="submit"
            className="blueBtn colWhite"
            onClick={registerUser}>
            ثبت نام
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
