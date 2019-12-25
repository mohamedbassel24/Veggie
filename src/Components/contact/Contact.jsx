import React from "react";
import NavBar from "../LandingPage/NavBar/NavBar";
import { Layout, Badge, Descriptions, Icon } from "antd";

const Contact = () => {
  return (
    <Layout>
      <NavBar />
      <Layout.Content className="backgrn" style={{ margin: "70px 100px" }}>
        <Descriptions title="Contact Us!" style={{ margin: "500px" }}>
          <Descriptions.Item label="Name">Abo youssef</Descriptions.Item>
          <Descriptions.Item label="Telephone">02-33452525</Descriptions.Item>
          <Descriptions.Item label="City">Mohandessen, Cairo</Descriptions.Item>
          <Descriptions.Item label="Email">
            <a href="mailto:name@google.com">Contact us on our email</a>
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            No. 18, Hegaz Street
          </Descriptions.Item>
        </Descriptions>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Consultation.io ©4019
      </Layout.Footer>
    </Layout>
  );
};

export default Contact;
