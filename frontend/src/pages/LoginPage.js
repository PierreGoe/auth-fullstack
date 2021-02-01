import { useState } from "react";

export function LoginPage() {
  const [form, setForm] = useState({
    haveAccount: false,
    mail: null,
    firstname: null,
    lastname: null,
    password: null,
    passwordBis: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newForm = { ...form };
    const newValue = type === "checkbox" ? checked : value;
    newForm[name] = newValue;
    setForm(newForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
