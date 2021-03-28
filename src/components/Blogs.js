import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/usersSlice";

import '../styling/blogs.css';

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const api_key = process.env.REACT_APP_GNEWS_API_KEY;
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=${api_key}`;

  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      async function getBlogs() {
        const res = await axios.get(blog_url);
        dispatch(setBlogData(res.data));
        setBlogs(res.data);
        setLoading(false);
      }
      getBlogs();
    } catch (error) {
      console.log(error);
    }
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h2 className="loading">Loading...</h2> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url}>
            <img src={blog.image} />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles === 0 && (
          <h1 className="no__blogs">No blogs available 😕. Search something else!</h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
