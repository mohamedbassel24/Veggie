import React from "react";
import { withFormik, Field } from "formik";
import { Form, Input, Icon, Button, Checkbox, DatePicker } from "antd";
let moment = require("moment");

const Signup = ({
  values,
  handleSubmit,
  handleChange,
  touched,
  errors,
  isSubmitting,
  setFieldValue
}) => {
  return (
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
        <Checkbox name="promos" onChange={handleChange}>
          Subscribe to weekly newsletter
        </Checkbox>
      </Form.Item>
      <Button type="primary" htmlType="submit" disabled={isSubmitting}>
        Signup
      </Button>
    </Form>
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
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 1000);
  }
})(Signup);
