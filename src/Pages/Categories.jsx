import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Base from "../Components/Base";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../Components/CategorySideMenu";
import { loadPostCategoryWise } from "../Service/Post-Service";
import { useState } from "react";
import { toast } from "react-toastify";
import Posts from "../Components/Posts";

const Categories = () => {
  const { categoryId } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error");
      });
  }, [categoryId]);

  return (
    <Base>
      <Container className="mt-3">
        <Row>
          <Col md={3} className="pt-4">
            <CategorySideMenu />
          </Col>
          <Col md={9}>
            <h1>Blogs Count ({posts.length})</h1>

            {posts &&
              posts.map((post, index) => {
                return <Posts key={index} post={post} />;
              })}
            {posts.length <= 0 ? <h1> No post in this category</h1> : ""}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default Categories;
