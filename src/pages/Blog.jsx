import { useState, useEffect } from 'react';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogAPI.getAll();
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <div className="page-header">
        <div className="container">
          <h1>Blog</h1>
          <p>Thoughts, tutorials, and insights about web development</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : posts.length === 0 ? (
            <div className="empty-state">
              <h3>No blog posts yet</h3>
              <p>Stay tuned for upcoming articles!</p>
            </div>
          ) : (
            <div className="blog-grid grid grid-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
