import React from "react";
import { withFormik, FormikProps, Formik } from "formik";
import { Form, Icon, Input, Button, Spin, Alert } from "antd";
import * as yup from "yup";
import Axios from "axios";
import { connect, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../types/actions";
import { bindActionCreators } from "redux";
import { loginUser } from "../../../types/Auth/authActions";
import { SET_CURRENT_USER, Iauth } from "../../../types/Auth/authTypes";
import { AppState } from "../../../reducers";
import { func } from "prop-types";
interface formValues {
  email: string;
  password: string;
}
interface LinkStateProps {
  auth: Iauth;
}
interface LinkDispatchProps {
  login: (userData: { email: string; password: string }) => void;
}
type ownProps = LinkDispatchProps & LinkStateProps;
const SignIn: React.FC<ownProps> = props => {
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

        console.log(props.auth);
        console.log("==============");
        const result = await props.login(authdata);
        setSubmitting(false);

        console.log(result);
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
              {errors.password && touched.password ? (
                <Alert message={errors.password} type="error" showIcon />
              ) : null}
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
        )
      }
    />
  );
};
/* const Signin = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  errors,
  touched
}: FormikProps<formValues>) => {
  return isSubmitting === true ? (
    <Spin size="large" tip="Submitting...">
      <Form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
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
          suffix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
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
  );
};

const formikEnhancer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props: ownProps) => ({
    email: "",
    password: "",
    login: props.login,
    auth: props.auth
  }),
  handleSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
    const authdata = {
      email: values.email,
      password: values.password,
      returnSecureToken: true
    };
    console.log(values.auth);
    console.log("==============");
    await values.login(authdata);
    console.log(values.auth);
    setSubmitting(false);
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
 */

/* const Signintest: React.FC<ownProps> = (props: ownProps) => {
  const dologin = async () => {
    console.log(props.auth);
    await props.login({ email: "test@gmail.com", password: "12345678" });

    console.log(props.auth);
  };
  return (
    <div>
      <h1 onClick={dologin}>sasasa</h1>
    </div>
  );
}; */

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    login: (userData: { email: string; password: string }) =>
      dispatch(loginUser(userData))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
