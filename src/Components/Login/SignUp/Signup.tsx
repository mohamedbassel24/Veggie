import React from "react";
import { withFormik } from "formik";
import { Form } from "antd";

const Signup = ({ values, handleSubmit, handleChange }) => {
  return (
    <Form>
      <Form.Item />
    </Form>
  );
};
export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
    }, 2000);
  }
})(Signup);
