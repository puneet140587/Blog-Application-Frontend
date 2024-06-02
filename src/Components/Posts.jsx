import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { authenticate, getCurrentUser } from "../Authentication";
import { useEffect } from "react";
import { useState, useContext } from "react";
import userContext from "../context/userContext";
const Posts = ({
  post = { id: -1, title: "default title", content: "default content" },
  deletePost,
}) => {
  const userContextData = useContext(userContext);
  const [login, setLogin] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLogin(authenticate());
    setUser(getCurrentUser());
  }, []);

  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 60) + "...",
          }}
        ></CardText>
        <div>
          <Link className="btn btn-secondary" to={"/post/" + post.postId}>
            Read More ...
          </Link>
          {userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <Button
                onClick={() => deletePost(post)}
                color="danger"
                className="ms-2"
              >
                Delete
              </Button>
            ) : (
              ""
            ))}
          {userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <Button
                tag={Link}
                to={`/user/update-blog/${post.postId}`}
                color="warning"
                className="ms-2"
              >
                Update
              </Button>
            ) : (
              ""
            ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default Posts;
