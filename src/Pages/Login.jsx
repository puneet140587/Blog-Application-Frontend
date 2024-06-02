import { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../Components/Base";
import { loginUser } from "../Service/User-Service";
import { doLogin, doLogout } from "../Authentication";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";

const Login = () => {
  const userContextData = useContext(userContext);

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e, field) => {
    let actualValue = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [field]: actualValue,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(loginDetails);
    // Validation
    if (
      loginDetails.username.trim() === "" ||
      loginDetails.password.trim() === ""
    ) {
      toast.error("Username or Password is required");
      return;
    }

    // Submit data to server to generate token
    loginUser(loginDetails)
      .then((data) => {
        console.log(data);

        // Save user data to local storage
        doLogin(data, () => {
          console.log("user login details is saved to localstorage");

          // redirect to user dashboard page
          userContextData.setUser({
            data: data.user,
            login: true,
          });

          navigate("/user/dashboard");
        });
        toast.success("user logged in Succesfully");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 404
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on server !!");
        }
      });
  };

  const handleReset = () => {
    setLoginDetails({
      username: "",
      password: "",
    });
  };

  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" outline>
              <CardHeader>
                <h3> Login here !!</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleFormSubmit}>
                  {/* Email Field */}
                  <FormGroup>
                    <Label for="email">Enter email </Label>
                    <Input
                      placeholder="Enter email here"
                      type="email"
                      id="email"
                      value={loginDetails.username}
                      onChange={(e) => handleChange(e, "username")}
                    />
                  </FormGroup>
                  {/* Password Field */}
                  <FormGroup>
                    <Label for="password">Enter password </Label>
                    <Input
                      placeholder="Enter password here"
                      type="password"
                      id="password"
                      value={loginDetails.password}
                      onChange={(e) => handleChange(e, "password")}
                    />
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="dark">Login</Button>
                    <Button
                      onClick={handleReset}
                      color="success"
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
    </Base>
  );
};

export default Login;
