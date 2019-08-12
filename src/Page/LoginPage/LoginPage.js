import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Card,
  Container,
  CardBody
} from "reactstrap";
import { Helmet } from "react-helmet";

import { authenticationService } from "../../_services";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Container className="pt-5">
          <Row>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
              <Card>
                <p className="h1 mx-auto">Login</p>
                <Formik
                  initialValues={{
                    username: "",
                    password: ""
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string().required("Username is required"),
                    password: Yup.string().required("Password is required")
                  })}
                  onSubmit={(
                    { username, password },
                    { setStatus, setSubmitting }
                  ) => {
                    setStatus();
                    authenticationService.login(username, password).then(
                      user => {
                        const { from } = this.props.location.state || {
                          from: { pathname: "/" }
                        };
                        this.props.history.push(from);
                      },
                      error => {
                        setSubmitting(false);
                        setStatus(error);
                      }
                    );
                  }}
                  render={({ errors, status, touched, isSubmitting }) => (
                    <Form className="form-signin">
                      <CardBody>
                        <FormGroup>
                          <Label for="username">Username</Label>
                          <Field
                            name="username"
                            type="text"
                            className={
                              "form-control" +
                              (errors.username && touched.username
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Field
                            name="password"
                            type="password"
                            className={
                              "form-control" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </FormGroup>
                      </CardBody>
                      <CardBody>
                        <Button
                          type="submit"
                          className="btn btn-login btn-block"
                          disabled={isSubmitting}
                        >
                          Login
                        </Button>
                      </CardBody>
                      <CardBody>
                        {status && (
                          <div className={"alert alert-danger"}>{status}</div>
                        )}
                      </CardBody>
                    </Form>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { LoginPage };
