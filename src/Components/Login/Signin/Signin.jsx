import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Icon, Input, Button, Spin, Alert } from "antd";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../types/Auth/authActions";

const SignIn = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [submit, isSubmitted] = useState(false);
  return (
    <Formik
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={yup.object().shape({
        username: yup.string().required("Enter Your Username"),

        password: yup.string().required("Enter a password")
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        console.log("xd");
        const authdata = {
          username: values.username,
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
            <Form
              onSubmit={handleSubmit}
              onChange={handleChange}
              style={{ textAlign: "left" }}
            >
              <Form.Item>
                <Input
                  suffix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter your Username"
                  value={values.username}
                  onChange={handleChange}
                  name="username"
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
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSubmitting}
                size="large"
              >
                Log in
              </Button>
            </Form>
          </Spin>
        ) : (
          <Form
            onSubmit={handleSubmit}
            onChange={handleChange}
            style={{ textAlign: "left" }}
          >
            <Form.Item>
              <Input
                suffix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your Username"
                value={values.username}
                autoFocus={true}
                onChange={handleChange}
                type="text"
                name="username"
              />
              {errors.username && touched.username ? (
                <Alert message={errors.username} type="error" showIcon />
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
          </Form>
        )
      }
    />
  );
};

export default SignIn;
