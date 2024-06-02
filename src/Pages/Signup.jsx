import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../Components/Base";
import { signUp } from "../Service/User-Service";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  /* useEffect(() => {
    console.log(data);
  }, [data]); */

  // handle change
  const handleChange = (e, property) => {
    // Setting field value dynamically
    setData({ ...data, [property]: e.target.value });
  };

  //Reset Form Fields
  const resetFields = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  // Submitting the form
  const submitForm = (e) => {
    e.preventDefault();
    if (error.isError) {
      toast.error("Form data is Invalid, Correct all details first");
      setError({ ...error, isError: false });
      return;
    }

    console.log(data);

    // Data Validate

    // Call Server api

    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("Success log");
        toast.success(
          "User is registered successfully !! with user id " + resp.id
        );
        setData({
          name: "",
          email: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        // handling Signup Errors properly
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  return (
    <Base>
      <div>
        <Container>
          <Row className="mt-4">
            <Col sm={{ size: 6, offset: 3 }}>
              <Card color="dark" outline>
                <CardHeader>
                  <h3> Fill information to register !!</h3>
                </CardHeader>
                <CardBody>
                  {/* Creating Form  */}
                  <Form onSubmit={submitForm}>
                    {/* Name Field */}
                    <FormGroup>
                      <Label for="name">Enter your Name</Label>
                      <Input
                        type="text"
                        placeholder="Please enter here"
                        id="name"
                        onChange={(e) => handleChange(e, "name")}
                        value={data.name}
                        invalid={
                          error.errors?.response?.data.name ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data.name}
                      </FormFeedback>
                    </FormGroup>
                    {/* Email Field */}
                    <FormGroup>
                      <Label for="email">Enter your Email</Label>
                      <Input
                        type="email"
                        placeholder="Please enter here"
                        id="email"
                        onChange={(e) => handleChange(e, "email")}
                        value={data.email}
                        invalid={
                          error.errors?.response?.data.email ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data.email}
                      </FormFeedback>
                    </FormGroup>
                    {/* Password Field */}
                    <FormGroup>
                      <Label for="password">Enter your Password</Label>
                      <Input
                        type="password"
                        placeholder="Please enter here"
                        id="password"
                        onChange={(e) => handleChange(e, "password")}
                        value={data.password}
                        invalid={
                          error.errors?.response?.data.password ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data.password}
                      </FormFeedback>
                    </FormGroup>
                    {/* About Field */}
                    <FormGroup>
                      <Label for="about">Enter about Information</Label>
                      <Input
                        type="textarea"
                        placeholder="Please enter here"
                        id="about"
                        style={{ height: "200px" }}
                        onChange={(e) => handleChange(e, "about")}
                        value={data.about}
                        invalid={
                          error.errors?.response?.data.about ? true : false
                        }
                      />
                      <FormFeedback>
                        {error.errors?.response?.data.about}
                      </FormFeedback>
                    </FormGroup>
                    <Container className="text-center">
                      <Button color="danger">Register</Button>
                      <Button
                        onClick={resetFields}
                        color="primary"
                        type="reset"
                        className="ms-2"
                      >
                        Reset
                      </Button>
                    </Container>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default Signup;
