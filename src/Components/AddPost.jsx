import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { fetchAllCategories } from "../Service/Category-Service";
import {
  createPost as doCreatePost,
  uploadPostImage,
} from "../Service/Post-Service";
import { getCurrentUser } from "../Authentication";

const AddPost = () => {
  const editor = useRef(null);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());

    fetchAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fieldChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const contentChange = (data) => {
    setPost({ ...post, content: data });
  };

  const createPost = (e) => {
    e.preventDefault();
    console.log(post);
    if (post.title.trim() === "") {
      toast.error("Post title is required");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("Post content is empty");
      return;
    }
    if (post.categoryId === "") {
      toast.error("Please choose a Category");
      return;
    }

    // Post the form to server
    post["userId"] = user.id;
    doCreatePost(post)
      .then((data) => {
        uploadPostImage(image, data.postId)
          .then((data) => {
            toast.success("Image uploaded");
          })
          .catch((error) => {
            toast.error("Error in uploading image");
            console.log(error);
          });

        toast.success("Post Created Successfully");
        setPost({
          title: "",
          content: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  // handling file change event

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Card className="shadow-sm border-0 mt-3">
        <CardBody>
          <h3>What's going on your mind ?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                onChange={fieldChange}
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
                onChange={contentChange}
              />
              {/* File field */}

              <div className="mt-3">
                {/*   <label for="image"> Select Post Banner</label> */}
                <input id="image" type="file" onChange={handleFileChange} />
              </div>

              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                placeholder="Enter here"
                className="rounded-0"
                name="categoryId"
                onChange={fieldChange}
                defaultValue={0}
              >
                <option disabled value={0}>
                  -- Select Category --
                </option>

                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Create Post
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

export default AddPost;
