import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { api, cookies } from "../conf";

export function LoginPage() {
  const [form, setForm] = useState({
    haveAccount: false,
    mail: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordBis: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newForm = { ...form };
    const newValue = type === "checkbox" ? checked : value;
    newForm[name] = newValue;
    setForm(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mail, password, firstname, lastname } = form;
    let url, formData;
    if (form.haveAccount) {
      url = "/auth/login";
      formData = { mail, password };
    } else {
      url = "/auth/signup";
      formData = { mail, password, firstname, lastname };
    }
    api
      .post(url, formData)
      .then(({ data }) => {
        const { token, user } = data;
        cookies.set("token", token);
        api.defaults.headers.authorization = "Bearer " + token;
        dispatch({ type: "LOGIN", user });
        toast(`You're now logged in, ${user.firstname} <3`);
      })
      .catch((e) => {
        toast.error("Achtung!" + e);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="haveAccount">
          <input
            type="checkbox"
            id="haveAccount"
            name="haveAccount"
            onChange={handleChange}
          />
          Have an account ?
        </label>
        <br />
        <label htmlFor="mail">
          Email
          <input
            type="mail"
            id="mail"
            name="mail"
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>
        <br />
        {!form.haveAccount && (
          <>
            <label htmlFor="passwordBis">
              Password (check)
              <input
                type="password"
                id="passwordBis"
                name="passwordBis"
                onChange={handleChange}
                placeholder="Enter your password (again)"
              />
            </label>
            <br />
            <label htmlFor="firstname">
              First name
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </label>
            <br />
            <label htmlFor="lastname">
              Last name
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={handleChange}
                placeholder="Enter your first name"
              />
            </label>
            <br />
          </>
        )}
        <input type="submit" value={form.haveAccount ? "Login" : "Sign up"} />
      </form>
    </>
  );
}
