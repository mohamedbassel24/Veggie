import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seats.css";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../reducers";
import { Layout, Checkbox, Row, Col, Button } from "antd";
import NavBar from "../LandingPage/NavBar/NavBar";

const Seats = props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props);
    async function fetchData() {
      await axios
        .get("http://localhost:6001/api/Reservations/" + props.match.params.ids)
        .then(async res => console.log(res));
    }
    fetchData();
  }, []);
  function save(event) {
    console.log(event.target.checked);
  }
  return (
    <Layout>
      <NavBar />
      <Layout.Content
        className="backgrn"
        style={{ padding: "40px 50px", textAlign: "center" }}
      >
        <form className="form">
          <ul>
            <li>
              <input type="checkbox" id="1" name="1" value="1" />
              <label htmlFor="1">1</label>
            </li>
            <li>
              <input type="checkbox" id="2" name="2" value="2" />
              <label htmlFor="2">2</label>
            </li>
            <li>
              <input type="checkbox" id="3" name="3" value="3" />
              <label htmlFor="3">3</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="4"
                name="4"
                value="4"
                checked
                disabled
              />
              <label htmlFor="4">4</label>
            </li>
          </ul>
          <button onClick={save}>Submit</button>
        </form>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Consultation.io ©4019 Created by Ahmed Khalifa
      </Layout.Footer>
    </Layout>
  );
};

export default Seats;
