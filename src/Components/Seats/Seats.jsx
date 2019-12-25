import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seats.css";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../reducers";
import { Layout, Checkbox, Button, Col, message } from "antd";
import NavBar from "../LandingPage/NavBar/NavBar";

const Seats = props => {
  const auth = useSelector(state => state.auth);
  let eid = props.match.params.ids;
  const [seats, setSeats] = useState([]);
  const dispatch = useDispatch();
  let Seatz = null;
  const onChangea = async i => {
    console.log("object");
    let data = seats;
    if (data[i] == 0) {
      data[i] = 1;
    } else {
      data[i] = 0;
    }
    await setSeats(data);
    console.log(seats);
  };
  const Submitos = async () => {
    let x = [];
    for (let index = 0; index < seats.length; index++) {
      if (seats[index] == 1) {
        await x.push(index);
      }
    }
    console.log(x);
    await axios
      .post("http://localhost:6001/api/Reservations/Create", {
        ReservationId: Math.random() * 1000000,
        Username: auth.user.username,
        EventId: eid,
        CreditCardNumber: Math.random() * 1000000,
        Seats: x
      })
      .then(res => message.success("Reservation Added"))
      .catch(err => message.error("Reservation Added"));
  };
  useEffect(() => {
    async function fetching() {
      await axios
        .get("http://localhost:6001/api/Events/" + eid)
        .then(async res => {
          await setSeats(res.data);
        });
    }
    fetching();
    /* async function fetchData() {
      await axios
        .get("http://localhost:6001/api/Reservations/" + props.match.params.ids)
        .then(async res => console.log(res));
    }
    fetchData(); */

    console.log(seats);
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
        <ul style={{ display: "block" }}>
          {seats.map((seatf, i) => {
            return (
              <li key={i} style={{ display: "inline-block" }}>
                <input
                  type="checkbox"
                  id={i + 1}
                  name={i + 1}
                  value={i + 1}
                  checked={seatf == 1}
                  disabled={seatf == 2}
                  onChange={() => onChangea(i)}
                />
                <label htmlFor={i + 1}>{i + 1}</label>
              </li>
            );
          })}
        </ul>

        {auth.isAuthenticated === true ? (
          <Button
            style={{ display: "block", margin: "20px" }}
            onClick={() => Submitos()}
            type="primary"
          >
            Submit
          </Button>
        ) : null}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Consultation.io ©2019
      </Layout.Footer>
    </Layout>
  );
};

export default Seats;
