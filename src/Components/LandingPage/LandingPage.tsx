import React from "react";
import NavBar from "./NavBar/NavBar";
import { Layout, Row, Col, Typography, Card, Carousel } from "antd";
import "./LandingPage.css";
import Title from "antd/lib/skeleton/Title";

export default function LandingPage() {
  return (
    <Layout>
      <NavBar />
      <Layout.Content
        className="bg"
        style={{ padding: "20px 50px", alignContent: "center" }}
      >
        <Row style={{ marginTop: "100px" }}>
          <Typography>
            <Typography.Title style={{ color: "#FF4500" }}>
              Paint the World in your own terms
            </Typography.Title>
            <Row>
              <Col span={12}>
                <Typography.Paragraph style={{ color: "#ffdb58" }}>
                  In the process of internal desktop applications development,
                  many different design specs and implementations would be
                  involved, which might cause designers and developers
                  difficulties and duplication and reduce the efficiency of
                  development.
                </Typography.Paragraph>
              </Col>
            </Row>
          </Typography>
        </Row>
        <Typography
          style={{ alignSelf: "center", margin: "auto", textAlign: "center" }}
        >
          <Typography.Title style={{ color: "grey" }}>
            {" "}
            In the Words of our Creators{" "}
          </Typography.Title>
        </Typography>
        <Carousel effect="fade" dots={false} autoplay={true}>
          <div style={{ textAlign: "center", maxHeight: "50%" }}>
            <img
              alt="img"
              src="https://mymodernmet.com/wp/wp-content/uploads/2017/12/how-to-find-art-niche-6.jpg"
              style={{
                maxHeight: "50vh",
                display: "block",
                margin: "auto",
                borderRadius: "30px"
              }}
            />
          </div>
          <div>
            <img
              alt="img"
              src="https://www.bls.gov/careeroutlook/2015/images/creative_cover.jpg"
              style={{
                maxHeight: "50vh",
                display: "block",
                margin: "auto",
                borderRadius: "30px"
              }}
            />
          </div>
          <div>
            <img
              alt="img"
              src="https://s23932.pcdn.co/wp-content/uploads/2018/04/GettyImages-158315317-1024x683.jpg"
              style={{
                maxHeight: "50vh",
                display: "block",
                margin: "auto",
                borderRadius: "30px"
              }}
            />
          </div>
        </Carousel>
        <Row gutter={16} style={{ margin: "50px" }}>
          <Col span={8}>
            <Card title="Ahmed Khalifa" bordered={false}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque ea
              aliquam in dolore voluptatem consequuntur vel repellat error ex
              tenetur molestiae quo temporibus voluptatibus accusamus fugiat
              cumque, necessitatibus itaque iusto!
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Omar Ahmed" bordered={false}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque ea
              aliquam in dolore voluptatem consequuntur vel repellat error ex
              tenetur molestiae quo temporibus voluptatibus accusamus fugiat
              cumque, necessitatibus itaque iusto!{" "}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Tamer Hagras" bordered={false}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque ea
              aliquam in dolore voluptatem consequuntur vel repellat error ex
              tenetur molestiae quo temporibus voluptatibus accusamus fugiat
              cumque, necessitatibus itaque iusto!{" "}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Typography>
              <Title>Join us Now!</Title>
            </Typography>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Veggie.io ©2019 Created by Ahmed Khalifa
      </Layout.Footer>
    </Layout>
  );
}
