import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI, commentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await blogAPI.getById(id);
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    setSubmitting(true);
    setCommentError(null);

    try {
      const response = await commentsAPI.create(id, { body: commentBody });
      setComments([response.data, ...comments]);
      setCommentBody('');
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="alert alert-error">{error}</div>
          <Link to="/blog" className="btn btn-outline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="alert alert-error">Post not found</div>
          <Link to="/blog" className="btn btn-outline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <article className="blog-article">
        <header className="article-header">
          <div className="container">
            <Link to="/blog" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Blog
            </Link>
            <div className="article-meta">
              <span className="article-date">{formatDate(post.createdAt)}</span>
              {post.author && <span className="article-author">by {post.author.username}</span>}
            </div>
            <h1 className="article-title">{post.title}</h1>
            {post.tags && post.tags.length > 0 && (
              <div className="article-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </header>

        {post.coverImage && (
          <div className="article-cover">
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}

        <div className="container">
          <div className="article-content">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <section className="comments-section">
        <div className="container">
          <h2>Comments ({comments.length})</h2>

          {isAuthenticated ? (
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              {commentError && <div className="alert alert-error">{commentError}</div>}
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  placeholder="Share your thoughts..."
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="login-prompt">
              <p>Please <Link to="/login">log in</Link> to leave a comment.</p>
            </div>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="comment-card">
                  <div className="comment-header">
                    <span className="comment-author">{comment.author?.username || 'Anonymous'}</span>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="comment-body">{comment.body}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
