import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../Components/Base";
import userContext from "../context/userContext";
import {
  loadPost,
  updatePost as doUpdatePost,
} from "../Service/Post-Service";
import { fetchAllCategories } from "../Service/Category-Service";
import JoditEditor from "jodit-react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";

const UpdateBlog = () => {
  const editor = useRef(null);

  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // Load the blog from database
    loadPost(blogId)
      .then((data) => {
        console.log(data);
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading the blog");
      });
  }, []);

  useEffect(() => {
    console.log("first");
    if (post) {
      if (post.user.id != object.user.data.id) {
        toast.error("This is not your post !!");
        navigate("/");
      }
    }
  }, [post]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const updatePost = (event) => {
    event.preventDefault();
    console.log(post);
    doUpdatePost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((res) => {
        console.log(res);
        toast.success("Post updated");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in updating post");
      });
  };

  const updateHtml = () => {
    return (
      <div>
        <Card className="shadow-sm border-0 mt-3">
          <CardBody>
            <h3>Update post from here !!</h3>
            <Form onSubmit={updatePost}>
              <div className="my-3">
                <Label for="title">Post Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="title"
                  value={post.title}
                  onChange={(event) => handleChange(event, "title")}
                />
                <Label for="content">Post Content</Label>
                {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                className="rounded-0"
                style={{ height: "300px" }}
              /> */}
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={(newContent) =>
                    setPost({ ...post, content: newContent })
                  }
                />
                {/* File field */}

                <div className="mt-3">
                  {/*   <label for="image"> Select Post Banner</label> */}
                  <input id="image" type="file" onChange={""} />
                </div>

                <Label for="category">Post Category</Label>
                <Input
                  type="select"
                  id="category"
                  placeholder="Enter here"
                  className="rounded-0"
                  name="categoryId"
                  onChange={(event) => handleChange(event, "categoryId")}
                  defaultValue={0}
                  value={post.categoryId}
                >
                  <option disabled value={0}>
                    -- Select Category --
                  </option>

                  {categories.map((category) => (
                    <option
                      value={category.categoryId}
                      key={category.categoryId}
                    >
                      {category.categoryTitle}
                    </option>
                  ))}
                </Input>
              </div>

              <Container className="text-center">
                <Button type="submit" className="rounded-0" color="primary">
                  Update Post
                </Button>
                <Button className="rounded-0 ms-2" color="danger">
                  Reset Content
                </Button>
              </Container>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <Base>
      <Container>{post && updateHtml()}</Container>
    </Base>
  );
};
export default UpdateBlog;
