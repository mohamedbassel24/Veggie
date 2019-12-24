import React, { useState } from "react";

import { Formik } from "formik";
import {
  Form,
  Input,
  Icon,
  Button,
  DatePicker,
  Spin,
  Alert,
  Select
} from "antd";
import * as yup from "yup";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../types/Auth/authActions";

const SignUp = () => {
  const { Option } = Select;

  const [submit, isSubmitted] = useState(false);
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        gender: "",
        address: "",
        date: moment()
      }}
      onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
        setSubmitting(true);
        const data = {
          username: values.username,
          email: values.email,
          password: values.password,
          date: values.date,
          address: values.address,
          gender: values.gender,
          returnSecureToken: true,
          firstname: values.firstname,
          lastname: values.lastname
        };
        console.log(data);
        await dispatch(signupUser(data));

        isSubmitted(true);
        if (!auth.errorMessage) {
          resetForm();
        }

        setSubmitting(false);
      }}
      validationSchema={yup.object().shape({
        gender: yup.string().notRequired(),
        username: yup
          .string()
          .required("Please Enter your Username")
          .max(30)
          .min(8, "Username Must be atleast 8 Characters"),
        firstname: yup
          .string()
          .required("Please enter your First name")
          .max(30),
        address: yup
          .string()
          .notRequired()
          .max(50),
        lastname: yup
          .string()
          .required("Please enter your Last name")
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
                    <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
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
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter your First Name"
                  value={values.firstname}
                  autoFocus={true}
                  onChange={handleChange}
                  type="text"
                  name="firstname"
                />
                {errors.firstname && touched.firstname ? (
                  <Alert message={errors.firstname} type="error" showIcon />
                ) : null}
              </Form.Item>
              <Form.Item>
                <Input
                  suffix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Enter your Last Name"
                  value={values.lastname}
                  autoFocus={true}
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                />
                {errors.lastname && touched.lastname ? (
                  <Alert message={errors.lastname} type="error" showIcon />
                ) : null}
              </Form.Item>
              <Form.Item>
                <Select
                  suffixIcon={
                    <Icon
                      type="contacts"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  defaultValue="male"
                  style={{ width: 120 }}
                  value={values.gender}
                  onChange={value => setFieldValue("gender", value)}
                  name="gender"
                >
                  <Option value="male" style={{ width: 120 }}>
                    Male
                  </Option>
                  <Option value="female" style={{ width: 120 }}>
                    Female
                  </Option>
                </Select>
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
                <Input
                  suffix={
                    errors.address && touched.address ? (
                      <Icon
                        type="exclamation-circle"
                        style={{ color: "red" }}
                      />
                    ) : (
                      <Icon
                        type="environment"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    )
                  }
                  placeholder="Enter your Address"
                  value={values.address}
                  onChange={handleChange}
                  type="address"
                  name="address"
                />
                {errors.address && touched.address ? (
                  <Alert message={errors.address} type="error" showIcon />
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
                  <Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />
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
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your First Name"
                value={values.firstname}
                autoFocus={true}
                onChange={handleChange}
                type="text"
                name="firstname"
              />
              {errors.firstname && touched.firstname ? (
                <Alert message={errors.firstname} type="error" showIcon />
              ) : null}
            </Form.Item>
            <Form.Item>
              <Input
                suffix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Enter your Last Name"
                value={values.lastname}
                autoFocus={true}
                onChange={handleChange}
                type="text"
                name="lastname"
              />
              {errors.lastname && touched.lastname ? (
                <Alert message={errors.lastname} type="error" showIcon />
              ) : null}
            </Form.Item>
            <Form.Item>
              <Select
                suffixIcon={
                  <Icon type="contacts" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                defaultValue="male"
                style={{ width: 120 }}
                value={values.gender}
                onChange={value => setFieldValue("gender", value)}
                name="gender"
              >
                <Option value="male" style={{ width: 120 }}>
                  Male
                </Option>
                <Option value="female" style={{ width: 120 }}>
                  Female
                </Option>
              </Select>
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
              <Input
                suffix={
                  errors.address && touched.address ? (
                    <Icon type="exclamation-circle" style={{ color: "red" }} />
                  ) : (
                    <Icon
                      type="environment"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  )
                }
                placeholder="Enter your Address"
                value={values.address}
                onChange={handleChange}
                type="address"
                name="address"
              />
              {errors.address && touched.address ? (
                <Alert message={errors.address} type="error" showIcon />
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
