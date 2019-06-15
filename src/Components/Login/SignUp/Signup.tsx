import React from "react";
import axios from "axios";
import { withFormik } from "formik";
import {
  Form,
  Input,
  Icon,
  Button,
  Checkbox,
  DatePicker,
  Spin,
  Alert
} from "antd";
import * as yup from "yup";
const Signup = ({
  values,
  handleSubmit,
  handleChange,
  touched,
  errors,
  isSubmitting,
  setFieldValue
}) => {
  return isSubmitting === false ? (
    <Form
      onChange={handleChange}
      onSubmit={handleSubmit}
      style={{ textAlign: "left" }}
    >
      <Form.Item>
        <Input
          suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Enter your Name"
          value={values.name}
          autoFocus={true}
          onChange={handleChange}
          type="text"
          name="name"
        />
        {errors.name && touched.name ? (
          <Alert message={errors.name} type="error" showIcon />
        ) : null}
      </Form.Item>
      <Form.Item>
        <Input
          suffix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
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
          suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
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
        <DatePicker
          name="date"
          value={values.date}
          suffixIcon={
            <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />
          }
          placeholder="Your Birth Date"
          format="DD/MM/YYYY"
          onChange={(date, dateString) => {
            return setFieldValue("date", date);
          }}
        />
        {errors.date && touched.date ? (
          <Alert message={errors.date} type="error" showIcon />
        ) : null}
      </Form.Item>
      <Form.Item>
        <Checkbox name="promos" onChange={handleChange}>
          Subscribe to weekly newsletter
        </Checkbox>
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        disabled={isSubmitting}
        size="large"
      >
        Signup
      </Button>
    </Form>
  ) : (
    <Spin size="large" tip="Submitting...">
      <Form
        onChange={handleChange}
        onSubmit={handleSubmit}
        style={{ textAlign: "left" }}
      >
        <Form.Item>
          <Input
            suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your Name"
            value={values.name}
            autoFocus={true}
            onChange={handleChange}
            type="text"
            name="name"
          />
        </Form.Item>
        <Form.Item>
          <Input
            suffix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your E-mail Address"
            value={values.email}
            onChange={handleChange}
            type="email"
            name="email"
          />
        </Form.Item>

        <Form.Item>
          <Input
            suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your Password"
            value={values.password}
            onChange={handleChange}
            type="password"
            name="password"
          />
        </Form.Item>
        <Form.Item>
          <DatePicker
            name="date"
            value={values.date}
            suffixIcon={
              <Icon type="calendar" style={{ color: "rgba(0,0,0,.25)" }} />
            }
            placeholder="Your Birth Date"
            onChange={(date, dateString) => {
              return setFieldValue("date", date);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            name="promos"
            checked={values.promos}
            onChange={handleChange}
          >
            Subscribe to weekly newsletter
          </Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isSubmitting}
          size="large"
        >
          Signup
        </Button>
      </Form>
    </Spin>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    password: "",
    date: null,
    promos: false
  }),
  handleSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
    const data = {
      email: values.email,
      password: values.password,
      returnSecureToken: true
    };
    await axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDAXLmBDlEIbiyD2Gyb1U2OMCqpIpzPweE",
        data
      )
      .then(res => {
        resetForm();
        setSubmitting(true);
      })
      .catch(err => {
        setErrors({ email: "Email is already taken." });
      });
    setSubmitting(false);
  },
  validationSchema: yup.object().shape({
    name: yup
      .string("Your name has to be a string")
      .required("Please enter your name")
      .max(30),
    email: yup
      .string()
      .required("Please enter your Email")
      .email("This field has to be an email"),
    password: yup
      .string()
      .min(8, "Password Must be atleast 8 characters")
      .required("Please enter your password"),
    date: yup
      .object()
      .shape({
        _d: yup
          .string("Please enter your Birth Date")
          .nullable(false)
          .required("Please enter your Birth Date")
      })
      .required("Please enter your Birth Date")
  })
})(Signup);
