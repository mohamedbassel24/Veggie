import React, { useState } from "react";

import { Formik } from "formik";
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
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../types/Auth/authActions";
import { AppState } from "../../../reducers";

interface formValues {
  email: string;
  password: string;
  name: string;
  promos: boolean;
  date: any;
}
const SignUp: React.FC<{}> = () => {
  const [submit, isSubmitted] = useState(false);
  const auth = useSelector((state: AppState) => state.auth);

  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name: "",
        date: moment(),
        promos: false
      }}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        setSubmitting(true);
        const data = {
          email: values.email,
          password: values.password,
          date: values.date,
          promos: values.promos,
          returnSecureToken: true,
          name: values.name
        };
        await dispatch(signupUser(data));

        isSubmitted(true);
        if (!auth.errorMessage) {
          resetForm();
        }

        setSubmitting(false);
      }}
      validationSchema={yup.object().shape({
        name: yup
          .string()
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
              .string()
              .nullable(false)
              .required("Please enter your Birth Date")
          })
          .required("Please enter your Birth Date")
      })}
      render={({
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        values,
        setFieldValue,
        handleChange
      }) =>
        isSubmitting === true ? (
          <Spin size="large" tip="Submitting...">
            <Form
              onChange={handleChange}
              onSubmit={handleSubmit}
              style={{ textAlign: "left" }}
            >
              <Form.Item>
                <Input
                  suffix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
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
                  suffix={
                    errors.email && touched.email ? (
                      <Icon
                        type="exclamation-circle"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                    )
                  }
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
                  suffix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
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
                    <Icon
                      type="calendar"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
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
          </Spin>
        ) : (
          <Form
            onChange={handleChange}
            onSubmit={handleSubmit}
            style={{ textAlign: "left" }}
          >
            <Form.Item>
              <Input
                suffix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
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
                suffix={
                  errors.email && touched.email ? (
                    <Icon type="exclamation-circle" style={{ color: "red" }} />
                  ) : (
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  )
                }
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
                suffix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
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
              {auth.errorMessage && touched.password && submit ? (
                <Alert message={auth.errorMessage} type="error" showIcon />
              ) : null}
              {!auth.errorMessage && submit ? (
                <Alert message="Signed Up!" type="success" showIcon />
              ) : null}
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
        )
      }
    />
  );
};

export default SignUp;
