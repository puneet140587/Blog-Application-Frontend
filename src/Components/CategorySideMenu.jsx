import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem } from "reactstrap";
import { fetchAllCategories } from "../Service/Category-Service";

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories()
      .then((data) => {
        console.log("Loading all categories");
        console.log(data);
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error(" Error in loading categories");
      });
  }, []);

  return (
    <div>
      <ListGroup>
        <ListGroupItem
          tag={Link}
          to="/"
          action={true}
          color="dark"
          className="border-0"
        >
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((category, index) => {
            return (
              <ListGroupItem
                className="border-0 mt-1 shadow-0"
                key={index}
                action={true}
                color="success"
                tag={Link}
                to={"/categories/" + category.categoryId}
              >
                {category.categoryTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default CategorySideMenu;
