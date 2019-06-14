import React, { Component } from "react";
import Logo from "../../static/logo.png";
import {
  faGithub,
  faTwitter,
  faTwitch,
  faMendeley
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Breadcrumb, Icon, Input } from "antd";

const { Header, Content, Footer } = Layout;
interface Props {}
const NavBar: React.FC<Props> = props => {
  return (
    <Header>
      <div />
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item key="1" disabled>
          <Icon type="dingding" theme="outlined" style={{ fontSize: "28px" }} />
          Veggie
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={{ pathname: "/" }}>Home</Link>
        </Menu.Item>
        <Menu.Item key="7" style={{ float: "right", textAlign: "center" }}>
          <Link to={{ pathname: "/login", state: { tab: 2 } }}>
            <Button>Sign up</Button>
          </Link>
        </Menu.Item>
        <Menu.Item key="9" style={{ float: "right", textAlign: "center" }}>
          <Link to={{ pathname: "/login", state: { tab: 1 } }}>
            <Button type="ghost" style={{ color: "white" }}>
              Login
            </Button>
          </Link>
        </Menu.Item>

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