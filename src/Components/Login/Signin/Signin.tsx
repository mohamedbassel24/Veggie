import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Icon, Input, Button, Spin, Alert } from "antd";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../types/Auth/authActions";
import { AppState } from "../../../reducers";

const SignIn: React.FC<{}> = () => {
  const auth = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const [submit, isSubmitted] = useState(false);
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .required("Enter an Email")
          .email("This field has to be an email"),
        password: yup
          .string()
          .min(8, "Password Must be atleast 8 characters")
          .required("Enter a password")
      })}
      onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
        const authdata = {
          email: values.email,
          password: values.password,
          returnSecureToken: true
        };

        //const result = await props.login(authdata);
        await dispatch(loginUser(authdata));
        isSubmitted(true);
        setSubmitting(false);
      }}
      render={({
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        values,
        handleChange
      }) =>
        isSubmitting === true ? (
          <Spin size="large" tip="Submitting...">
            <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
              <Form.Item>
                <Input
                  suffix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter your E-mail Address"
                  value={values.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  suffix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter your Password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                  size="large"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        ) : (
          <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
            <Form.Item>
              <Input
                suffix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your E-mail Address"
                value={values.email}
                autoFocus={true}
                onChange={handleChange}
                type="email"
                name="email"
              />
              {errors.email && touched.email ? (
                <Alert message={errors.email} type="error" showIcon />
              ) : null}
            </Form.Item>
            <Form.Item>
              <Input
                suffix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your Password"
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
              />
              {auth.errorMessage &&
              touched.password &&
              auth.errorMessage.includes("Password") &&
              submit ? (
                <Alert message={auth.errorMessage} type="error" showIcon />
              ) : null}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
                size="large"
                style={{ marginBottom: "5px" }}
              >
                Log in
              </Button>
              {!auth.errorMessage && submit ? (
                <Alert message="Signed In!" type="success" showIcon />
              ) : null}
            </Form.Item>
          </Form>
        )
      }
    />
  );
};

export default SignIn;
