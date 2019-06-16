import React from "react";
import { Tabs, Card, Layout } from "antd";
import NavBar from "../LandingPage/NavBar/NavBar";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
const { TabPane } = Tabs;

export default function Login(Props: any) {
  let tab: number =
    Props.location.state === undefined ? 1 : Props.location.state.tab;
  return (
    <div className="bg">
      <NavBar />
      <Layout.Content style={{ marginTop: "50px" }}>
        <Card style={{ textAlign: "center", width: "50%", margin: "auto" }}>
          <Tabs tabPosition="left" defaultActiveKey={tab.toString()}>
            <TabPane tab="Login" key="1">
              <Signin />
            </TabPane>
            <TabPane tab="Signup" key="2">
              <Signup />
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
