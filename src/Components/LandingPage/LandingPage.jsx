import React from "react";
import NavBar from "./NavBar/NavBar";
import { Layout, Row, Col, Typography, Card } from "antd";
import "./LandingPage.css";
import Title from "antd/lib/skeleton/Title";
import { useSelector, useDispatch } from "react-redux";

export default function LandingPage() {
  const auth = useSelector(state => state.auth);
  const { Meta } = Card;

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
          <p>Lol</p>
        )}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Consultation.io ©2019 Created by Ahmed Khalifa
      </Layout.Footer>
    </Layout>
  );
}
