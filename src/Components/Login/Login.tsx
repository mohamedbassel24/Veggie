import React from "react";
import { Tabs, Card, Form, Icon, Input, Checkbox, Button, Layout } from "antd";
import NavBar from "../LandingPage/NavBar/NavBar";
const { TabPane } = Tabs;

export default function Login(Props) {
  let tab: number = Props.location.state.tab;
  return (
    <div className="bg">
      <NavBar />
      <Layout.Content style={{ marginTop: "50px" }}>
        <Card style={{ textAlign: "center", width: "50%", margin: "auto" }}>
          <Tabs tabPosition="left" defaultActiveKey={tab.toString()}>
            <TabPane tab="Login" key="1">
              Content of Tab 1
            </TabPane>
            <TabPane tab="Signup" key="2">
              Content of Tab 2
            </TabPane>
          </Tabs>
        </Card>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }} className="footer">
        Veggie.io ©2019 Created by Ahmed Khalifa
      </Layout.Footer>
    </div>
  );
}
