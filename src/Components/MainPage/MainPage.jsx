import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Layout, Row, Col, Card, Icon, message } from "antd";
import NavBar from "../LandingPage/NavBar/NavBar";
import Meta from "antd/lib/card/Meta";
import moment from "moment";

import Typography from "antd/lib/typography/Typography";
const MainPage = () => {
  const [dataa, setData] = useState([]);
  function HomeButton(str) {
    const history = useHistory();

    history.push("/seats" + str);
  }
  const handlePageChange = id => {
    let string = "http://localhost:3000/seats/" + id;
    window.location.assign(string);
  };
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:6001/api/Events/")
        .then(async res => await setData(res.data));
    }
    fetchData();
  }, []);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(dataa);
  const Events = dataa.map((event, i) => {
    let id = event.EventId;
    let url = "seats/" + id;
    let urlz = event.EventPoster;

    return (
      <Col key={i} span={6} style={{ height: 150, width: 300, margin: "9px" }}>
        <Card
          style={{ height: 150, width: 300, margin: "9px" }}
          cover={<img alt={i + 1} src={urlz} style={{ height: "200px" }} />}
          actions={
            auth.isAuthenticated === true && auth.user.Priv == 2
              ? [
                  <Icon
                    type="close-circle"
                    key="setting"
                    onClick={() => {
                      axios
                        .post("http://localhost:6001/api/Events/Remove/", {
                          EventId: event.EventId
                        })
                        .then(res => message.success(res.data.ReturnMsg))
                        .catch(err => message.error(err.data.ReturnedMsg));
                    }}
                  />,

                  <Link to={url} replace>
                    <Icon type="arrow-right" key="right" />
                  </Link>,
                  <Typography>
                    <Icon type="number" key="right" /> {event.HallId}
                  </Typography>
                ]
              : [
                  <Icon
                    type="close-circle"
                    key="setting"
                    onClick={async () => {
                      await axios
                        .post(
                          "http://localhost:6001/api/Reservations/Remove/",
                          {
                            EventId: event.EventId,
                            Username: auth.user.username
                          }
                        )
                        .then(res => message.success("Removed Reservation"))
                        .catch(err =>
                          message.error("Couldn't Remove Reservation")
                        );
                    }}
                  />,
                  <Link to={url}>
                    <Icon type="arrow-right" key="right" />
                  </Link>,
                  <Typography>
                    <Icon type="number" key="right" /> {event.HallId}
                  </Typography>
                ]
          }
        >
          <Meta title={event.EventName} description={event.Description} />
          <Typography>{moment(event.Datetime).format("MMM Do YY")}</Typography>
        </Card>
      </Col>
    );
  });
  return (
    <Layout>
      <NavBar />
      <Layout.Content
        className="backgrn"
        style={{ padding: "40px 50px", textAlign: "center" }}
      >
        <Row gutter={16}>{Events}</Row>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Veggie.io ©2019
      </Layout.Footer>
    </Layout>
  );
};
export default MainPage;
