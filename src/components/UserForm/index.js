import React from "react";
import { useImputValue } from "../../hooks/useInputValue";
import { Error, Title, Form, Input } from "./styles";
import {SubmitButton} from "../SubmitButton";

export const UserForm = ({ error, disabled, onSubmit, title }) => {
  const email = useImputValue("testmail@mail.com");
  const password = useImputValue("1234");

  const handlerSubmit = e => {
    e.preventDefault();
    onSubmit({ email: email.value, password: password.value });
  };
  return (
    <>
      <Form disabled={disabled} onSubmit={handlerSubmit}>
        <Title>{title}</Title>
        <Input disabled={disabled} placeholder="Email" {...email} />
        <Input disabled={disabled} placeholder="Password" type="password" {...password} />
        {error && <Error>{error}</Error>}
        <SubmitButton disabled={disabled}>{title}</SubmitButton>
      </Form>
    </>
  );
};
