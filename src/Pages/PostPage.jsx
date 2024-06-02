import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import Base from "../Components/Base";
import { createComment, loadPost } from "../Service/Post-Service";
import { BASE_URL } from "../Service/Helper";
import { authenticate } from "../Authentication";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({ content: "" });

  useEffect(() => {
    // Load post of postId

    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post");
      });
  }, [postId]);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleString();
  };

  const submitPost = () => {
    if (!authenticate()) {
      toast.error("you need to login first !!");
      return;
    }

    if (comment.content.trim() === "") {
      return;
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        toast.success("Comment added successfully...");
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to="">{post.title} </Link>}
        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-3 ps-2 border-0 shadow-sm">
              {post && (
                <CardBody>
                  <CardText>
                    Posted by <b>{post.user.name}</b> on
                    <b>{printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <span className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>
                  <div
                    className="divider"
                    style={{
                      width: "100%",
                      height: "2px",
                      background: "#e2e2e2",
                    }}
                  ></div>
                  <CardText className="mt-3">
                    <h1>{post.title}</h1>
                  </CardText>
                  <div className="image-container mt-3  style={{width: '50%}}">
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/post/image/" + post.imageName}
                    />
                  </div>
                  <CardText
                    className="mt-3"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="my-4">
          <Col
            md={{
              size: 9,
              offset: 1,
            }}
          >
            <h3>Comments ({post ? post.comments.length : ""})</h3>

            {post &&
              post.comments.map((c, index) => {
                console.log(c);

                <Card className="mt-4 border-0" key={index}>
                  <CardBody>
                    <CardText>{c.content}</CardText>
                  </CardBody>
                </Card>;
              })}
          </Col>
          <Card className="mt-4 border-0">
            <CardBody>
              <Input
                type="textarea"
                placeholder=" Enter comment here"
                value={comment.content}
                onChange={(e) => setComment({ content: e.target.value })}
              />
              <Button color="primary" className="mt-2" onClick={submitPost}>
                Submit
              </Button>
            </CardBody>
          </Card>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
