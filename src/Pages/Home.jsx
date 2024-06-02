import { Col, Container, Row } from "reactstrap";
import Base from "../Components/Base";
import CategorySideMenu from "../Components/CategorySideMenu";
import { NewFeed } from "../Components/NewFeed";

const Home = () => {
  return (
    <Base>
      <div>
        <Container className="mt-3">
          <Row>
            <Col md={3} className="pt-4">
              <CategorySideMenu />
            </Col>
            <Col md={9}>
              <NewFeed />
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default Home;
