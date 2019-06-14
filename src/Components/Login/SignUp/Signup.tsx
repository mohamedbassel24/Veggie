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
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
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
          onChange={(date, dateString) => {
            return setFieldValue("date", date);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox name="promos" onChange={handleChange}>
          Subscribe to promotions
        </Checkbox>
      </Form.Item>
      <Button type="primary" htmlType="submit" disabled={isSubmitting}>
        Log in
      </Button>
    </Form>
  );
};
export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    date: moment(),
    promos: false
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values.date);
      setSubmitting(false);
    }, 1000);
  }
})(Signup);
