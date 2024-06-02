import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { loadAllPosts } from "../Service/Post-Service";
import Posts from "./Posts";

export const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    lastPage: false,
    pageNumber: "",
    pageSize: "",
    totalElements: "",
    totalPages: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Load all the posts here
    /*  loadAllPosts(0, 5)
      .then((data) => {
        console.log(data);
        setPostContent(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading posts");
      }); */
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }

    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        /* setPostContent(data);
        console.log(data);
        window.scroll(0, 0); */
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  const changePageInfinite = () => {
    console.log("page changed");
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 12,
            //offset: 1,
          }}
        >
          <h1> Blogs Count ({postContent?.totalElements})</h1>
        </Col>

        <InfiniteScroll
          dataLength={postContent.content.length}
          next={changePageInfinite}
          hasMore={true}
          /* loader={<h4>Loading...</h4>} */
          /* endMessage={
            <p style={{ textAlign: "right" }}>
              <b>Yay! You have seen it all</b>
            </p>
          } */
        >
          {postContent.content.map((post) => {
            return <Posts key={post.postId} post={post} />;
          })}
        </InfiniteScroll>

        {/*  <Container className="mt-2">
          <Pagination size="lg">
            <PaginationItem
              onClick={() => changePage(postContent.pageNumber - 1)}
              disabled={postContent.pageNumber === 0}
            >
              <PaginationLink previous>Previous</PaginationLink>
            </PaginationItem>

            {[...Array(postContent.totalPages)].map((item, index) => (
              <PaginationItem
                active={index === postContent.pageNumber}
                key={index}
                onClick={() => changePage(index)}
              >
                <PaginationLink>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem
              onClick={() => changePage(postContent.pageNumber + 1)}
              disabled={postContent.lastPage}
            >
              <PaginationLink next>Next</PaginationLink>
            </PaginationItem>
          </Pagination>
        </Container> */}
      </Row>
    </div>
  );
};
