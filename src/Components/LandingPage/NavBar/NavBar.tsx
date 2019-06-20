import React from "react";

import { Link } from "react-router-dom";
import { Button } from "antd";

import { Layout, Menu, Icon } from "antd";
import { AppState } from "../../../reducers";
import { useSelector } from "react-redux";

const { Header } = Layout;

const NavBar: React.FC<{}> = () => {
  const auth = useSelector((state: AppState) => state.auth);
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item key="1" disabled>
          <Icon type="dingding" theme="outlined" style={{ fontSize: "28px" }} />
          Veggie
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={{ pathname: "/" }}>Home</Link>
        </Menu.Item>
        {auth.isAuthenticated === true ? (
          <Menu.Item key="7" style={{ float: "right", textAlign: "center" }}>
            <Button>Logout</Button>
          </Menu.Item>
        ) : null}
        {auth.isAuthenticated === false ? (
          <Menu.Item key="7" style={{ float: "right", textAlign: "center" }}>
            <Link to={{ pathname: "/login", state: { tab: 2 } }}>
              <Button>Sign up</Button>
            </Link>
          </Menu.Item>
        ) : null}
        {auth.isAuthenticated === false ? (
          <Menu.Item key="9" style={{ float: "right", textAlign: "center" }}>
            <Link to={{ pathname: "/login", state: { tab: 1 } }}>
              <Button type="ghost" style={{ color: "white" }}>
                Login
              </Button>
            </Link>
          </Menu.Item>
        ) : null}
        <Menu.Item key="6" style={{ float: "right", textAlign: "center" }}>
          <Icon
            type="ant-design"
            theme="outlined"
            style={{ fontSize: "25px" }}
          />
        </Menu.Item>
        <Menu.Item key="5" style={{ float: "right", textAlign: "center" }}>
          <Icon type="twitter" theme="outlined" style={{ fontSize: "25px" }} />
        </Menu.Item>
        <Menu.Item key="3" style={{ float: "right" }}>
          <Icon type="github" theme="outlined" style={{ fontSize: "25px" }} />
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavBar;
