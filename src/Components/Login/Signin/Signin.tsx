import React from "react";
import { withFormik, Field, yupToFormErrors } from "formik";
import { Form, Icon, Input, Button, Spin, Alert } from "antd";
let yup = require("yup");

const Signin = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  errors,
  touched
}) => {
  return isSubmitting == true ? (
    <Spin size="large" tip="Submitting...">
      <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
        <Form.Item>
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your E-mail Address"
            value={values.email}
            onChange={handleChange}
            type="email"
            name="email"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your Password"
            value={values.password}
            onChange={handleChange}
            type="password"
            name="password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isSubmitting}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  ) : (
    <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <Form.Item>
        <Input
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Enter your E-mail Address"
          value={values.email}
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
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Enter your Password"
          value={values.password}
          onChange={handleChange}
          type="password"
          name="password"
        />
        {errors.password && touched.password ? (
          <Alert message={errors.password} type="error" showIcon />
        ) : null}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={isSubmitting}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 2000);
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required("Enter an Email")
      .email("This field has to be an email"),
    password: yup
      .string()
      .min(8, "Password Must be atleast 8 characters")
      .required("Enter a password")
  })
})(Signin);