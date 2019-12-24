import React from "react";
import NavBar from "./NavBar/NavBar";

import {
  Layout,
  Form,
  Button,
  Select,
  Card,
  Input,
  DatePicker,
  Icon,
  message,
  Divider,
  Upload
} from "antd";
import "./LandingPage.css";
import moment from "moment";
import * as yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
export default function LandingPage() {
  const auth = useSelector(state => state.auth);
  const { Meta } = Card;
  const { Option } = Select;
  const { TextArea } = Input;

  const formik = useFormik({
    initialValues: {
      username: ""
    },
    onSubmit: values => {
      axios
        .post("http://localhost:6001/api/Users/Remove", {
          Username: values.username
        })
        .then(res => {
          message.success(res.data.ReturnMsg);
        })
        .catch(err => message.error(err.data.ReturnMsg));
    }
  });
  const formik2 = useFormik({
    initialValues: {
      username: "",
      priv: ""
    },
    onSubmit: values => {
      axios
        .post("http://localhost:6001/api/Users/Authority", {
          Username: values.username,
          Priv: values.priv
        })
        .then(res => {
          message.success(res.data.ReturnMsg);
        })
        .catch(err => message.error(err.data.ReturnMsg));
    }
  });

  const formik3 = useFormik({
    initialValues: {
      EventName: "",
      Description: "",
      EventPoster: "",
      Datetime: moment(),
      HallId: "",
      file: null
    },
    onSubmit: values => {
      let file = values.file;
      var reader = new FileReader();
      let srcData = 0;
      reader.onloadend = async function(file) {
        let srcData = await file.target.result;
      };

      axios
        .post("http://localhost:6001/api/Events/Create", {
          EventName: values.EventName,
          Description: values.Description,
          EventPoster: values.EventPoster,
          Datetime: values.Datetime,
          HallId: values.HallId,
          EventId: Math.random() * 100000000,
          EventPoster: srcData
        })
        .then(res => {
          message.success("Event Added");
        })
        .catch(err => message.error(err.data.Msg));
    }
  });
  const createhall = useFormik({
    initialValues: {
      seatcount: ""
    },
    onSubmit: values => {
      axios
        .post("http://localhost:6001/api/Halls/Create", {
          SeatsCount: values.seatcount,
          HallId: Math.random() * 100000000
        })
        .then(res => {
          message.success("Hall Added");
        })
        .catch(err => message.error("Error"));
    }
  });
  return (
    <Layout>
      <NavBar />
      <Layout.Content
        className="bg"
        style={{ padding: "20px 50px", alignContent: "center" }}
      >
        {auth.isAuthenticated === false ? (
          <Card
            style={{
              textAlign: "center",
              width: "40%",
              margin: "auto",
              alignContent: "center"
            }}
            cover={
              <img
                alt="example"
                src="https://img.as-creation.com/s36/4700944.jpg"
                style={{
                  height: "20%",
                  textAlign: "center",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
            }
          >
            <Meta title="Opera House" description="Welcome to Our Page" />
          </Card>
        ) : (
          <Card
            style={{
              textAlign: "left",
              width: "40%",
              margin: "auto",
              alignContent: "left"
            }}
          >
            {auth.user.Priv == 1 ? (
              <div>
                <Form onSubmit={formik.handleSubmit}>
                  <Input
                    placeholder="Delete User"
                    name="username"
                    type="text"
                    id="username"
                    style={{ display: "inline-block", width: "70%" }}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Button
                    type="danger"
                    htmlType="submit"
                    size="medium"
                    id="username"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "7px",
                      display: "inline"
                    }}
                  >
                    Delete
                  </Button>
                </Form>
                <Form onSubmit={formik2.handleSubmit}>
                  <Input
                    placeholder="Change Authority"
                    name="username"
                    type="text"
                    id="username"
                    style={{ display: "inline-block", width: "70%" }}
                    onChange={formik2.handleChange}
                    value={formik2.values.username}
                  />
                  <Select
                    defaultValue="1"
                    style={{
                      width: 90,
                      marginLeft: "5px",
                      marginRight: "5px",
                      display: "inline-block"
                    }}
                    value={formik2.values.priv}
                    onChange={value => formik2.setFieldValue("priv", value)}
                    name="priv"
                  >
                    <Option value="1" style={{ width: 90 }}>
                      1
                    </Option>
                    <Option value="2" style={{ width: 90 }}>
                      {" "}
                      2
                    </Option>
                  </Select>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="medium"
                    id="username"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "7px",
                      marginTop: "7px",

                      display: "inline"
                    }}
                  >
                    Change Authority
                  </Button>
                </Form>
              </div>
            ) : null}
            {auth.user.Priv == 2 ? (
              <div>
                <Divider orientation="left">New Event</Divider>

                <Form onSubmit={formik3.handleSubmit}>
                  <Input
                    placeholder="Event Name"
                    name="EventName"
                    type="text"
                    style={{
                      display: "inline-block",
                      width: "70%",
                      margin: "5px"
                    }}
                    onChange={formik3.handleChange}
                    value={formik3.values.EventName}
                  />
                  <DatePicker
                    name="date"
                    value={formik3.values.date}
                    suffixIcon={
                      <Icon
                        type="calendar"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    style={{ margin: "5px" }}
                    placeholder="Event Date"
                    format="DD/MM/YYYY"
                    onChange={(date, dateString) => {
                      return formik3.setFieldValue("date", date);
                    }}
                  />
                  <TextArea
                    placeholder="Event Description"
                    rows={4}
                    name="Description"
                    style={{ display: "block", margin: "5px" }}
                    onChange={formik3.handleChange}
                    value={formik3.values.Description}
                  />
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    onChange={event => {
                      formik3.setFieldValue(
                        "file",
                        event.currentTarget.files[0]
                      );
                    }}
                    style={{ margin: "5px" }}
                  />
                  <Input
                    placeholder="Enter Hall ID"
                    name="HallId"
                    type="text"
                    id="username"
                    style={{
                      display: "inline-block",
                      width: "20%",
                      margin: "5px"
                    }}
                    onChange={formik3.handleChange}
                    value={formik3.values.HallId}
                  />

                  <Button
                    type="primary"
                    htmlType="submit"
                    size="medium"
                    id="username"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "7px",
                      display: "inline"
                    }}
                  >
                    Create Event
                  </Button>
                </Form>
                <Divider orientation="left">New Hall</Divider>
                <Form onSubmit={createhall.handleSubmit}>
                  <Input
                    placeholder="Seat Count"
                    name="seatcount"
                    type="text"
                    id="seatcount"
                    style={{ display: "inline-block", width: "70%" }}
                    onChange={createhall.handleChange}
                    value={createhall.values.seatcount}
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="medium"
                    style={{
                      marginBottom: "5px",
                      marginLeft: "7px",
                      display: "inline"
                    }}
                  >
                    Create Hall
                  </Button>
                </Form>
              </div>
            ) : null}
          </Card>
        )}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Consultation.io ©2019 Created by Ahmed Khalifa
      </Layout.Footer>
    </Layout>
  );
}
