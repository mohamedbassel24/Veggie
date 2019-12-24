import React from "react";
import "./MainPage.css";
import { useSelector, useDispatch } from "react-redux";

import { Layout, Row, Col, Card, Icon } from "antd";
import NavBar from "../LandingPage/NavBar/NavBar";
import Meta from "antd/lib/card/Meta";
import Typography from "antd/lib/typography/Typography";
const MainPage = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  return (
    <Layout>
      <NavBar />
      <Layout.Content
        className="backgrn"
        style={{ padding: "40px 50px", textAlign: "center" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="close-circle" key="setting" />,
                <Icon type="arrow-right" key="right" />,
                <Typography>
                  <Icon type="number" key="right" /> 1
                </Typography>
              ]}
            >
              <Meta title="Event A" description="This is my event" />
              <Typography>Date here</Typography>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="close-circle" key="setting" />,
                <Icon type="arrow-right" key="right" />,
                <Typography>
                  <Icon type="number" key="right" /> 1
                </Typography>
              ]}
            >
              <Meta title="Event A" description="This is my event" />
              <Typography>Date here</Typography>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <Icon type="close-circle" key="setting" />,
                <Icon type="arrow-right" key="right" />,
                <Typography>
                  <Icon type="number" key="right" /> 1
                </Typography>
              ]}
            >
              <Meta title="Event A" description="This is my event" />
              <Typography>Date here</Typography>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Veggie.io ©4019 Created by Ahmed Khalifa
      </Layout.Footer>
    </Layout>
  );
};

export default MainPage;
