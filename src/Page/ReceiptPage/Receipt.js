import React, { Component } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { FormGroup, Container, Col, Card, CardBody } from "reactstrap";
import ReactNotification from "react-notifications-component";
import { Helmet } from "react-helmet";

import LoadingButton from "./LoadingButton";
import API from "./API";

class Receipt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      isLoading: false
    };
    this.notificationDOMRef = React.createRef();
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  isToggle = () => {
    this.setState({ isloading: !this.state.isloading });
  };

  handleSubmit = e => {
    e.preventDefault();
    let d = new Date();
    this.setState({
      time: d.toLocaleTimeString("th")
    });

    moment.locale("th");
    let maindate = this.state.startDate;
    const dateOBj = moment(maindate).format("YYYYMMDD");
    const timeSubmit = moment(maindate).format("D MMMM YYYY"); // เวลา Client Request
    this.setState({ isLoading: !this.state.dateOBj });

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    API.get(`${dateOBj}`, {
      cancelToken: source.token
    })
      .then(res => {
        this.setState({ isLoading: !res.data });
        console.log(res);
        console.log(res.data);
        console.log("=======Success Response=======");
        this.notificationDOMRef.current.addNotification({
          title: "Success",
          message: `Submit Date ${timeSubmit}, Time ${this.state.time}`,
          type: "success",
          insert: "top",
          container: "bottom-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismissable: { click: true },
          width: 350
        });
      })

      .catch(err => {
        if ((null, err.res)) {
          if (axios.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
          }
          this.setState({ isLoading: err.res.data });
          console.log(err.res.data);
          console.log(err.res.status);
          console.log(err.res.headers);
          console.log("======Failure=======");
          this.notificationDOMRef.current.addNotification({
            title: "Error",
            message: `Error Date! ${timeSubmit}, Time ${this.state.time}`,
            type: "danger",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismissable: { click: true },
            width: 350
          });
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
        console.log(err.config);
      });
  };

  render() {
    const loader = this.state.isLoading;
    const date = this.state.startDate;
    return (
      <div>
        <Helmet>
          <title>Receipt</title>
        </Helmet>
        <Container className="pt-5">
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <Card className="receipt-card">
              <CardBody style={{ textAlign: "center" }}>
                <h2>Receipt</h2>
                <form onSubmit={this.handleSubmit} onClick={this.isToggle}>
                  <ReactNotification ref={this.notificationDOMRef} />
                  <FormGroup>
                    <label style={{ padding: "5px" }}>Select Date:</label>
                    <DatePicker
                      selected={date}
                      onChange={this.handleChange}
                      name="startDate"
                      dateFormat="d MMMM yyyy"
                      maxDate={new Date()}
                      className="nice-input form-control"
                      placeholderText="Click to select a date"
                      disabled={loader}
                    />
                  </FormGroup>
                  <FormGroup>
                    <CardBody>
                      <LoadingButton
                        className="m-1"
                        loading={loader}
                        disabled={loader}
                      >
                        Submit Date
                      </LoadingButton>
                    </CardBody>
                  </FormGroup>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}

export { Receipt };
