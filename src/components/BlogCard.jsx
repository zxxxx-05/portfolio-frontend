import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post }) => {
  const { _id, title, excerpt, content, author, createdAt, tags, coverImage } = post;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayExcerpt = excerpt || (content ? content.substring(0, 150) + '...' : '');

  return (
    <article className="blog-card card">
      {coverImage && (
        <div className="blog-image">
          <img src={coverImage} alt={title} />
        </div>
      )}
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-date">{formatDate(createdAt)}</span>
          {author && <span className="blog-author">by {author.username}</span>}
        </div>
        <h3 className="blog-title">
          <Link to={`/blog/${_id}`}>{title}</Link>
        </h3>
        <p className="blog-excerpt">{displayExcerpt}</p>
        {tags && tags.length > 0 && (
          <div className="blog-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
        <Link to={`/blog/${_id}`} className="blog-link">
          Read More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
