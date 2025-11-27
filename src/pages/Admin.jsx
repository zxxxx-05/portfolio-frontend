import { useState, useEffect } from 'react';
import { projectsAPI, blogAPI, contactAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: '',
    technologies: ''
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    tags: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, postsRes, messagesRes] = await Promise.all([
        projectsAPI.getAll(),
        blogAPI.getAll(),
        contactAPI.getAll()
      ]);
      setProjects(projectsRes.data);
      setPosts(postsRes.data);
      setMessages(messagesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Project handlers
  const handleProjectChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      imageUrl: '',
      repoUrl: '',
      liveUrl: '',
      technologies: ''
    });
    setEditingProject(null);
    setShowProjectForm(false);
    setFormError(null);
  };

  const handleEditProject = (project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || '',
      technologies: project.technologies?.join(', ') || ''
    });
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    const data = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, data);
        setFormSuccess('Project updated successfully!');
      } else {
        await projectsAPI.create(data);
        setFormSuccess('Project created successfully!');
      }
      await fetchData();
      resetProjectForm();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project');
    }
  };

  // Blog handlers
  const handleBlogChange = (e) => {
    setBlogForm({ ...blogForm, [e.target.name]: e.target.value });
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      coverImage: '',
      tags: ''
    });
    setEditingPost(null);
    setShowBlogForm(false);
    setFormError(null);
  };

  const handleEditPost = (post) => {
    setBlogForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      coverImage: post.coverImage || '',
      tags: post.tags?.join(', ') || ''
    });
    setEditingPost(post);
    setShowBlogForm(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    const data = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, data);
        setFormSuccess('Blog post updated successfully!');
      } else {
        await blogAPI.create(data);
        setFormSuccess('Blog post created successfully!');
      }
      await fetchData();
      resetBlogForm();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save blog post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await blogAPI.delete(id);
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete blog post');
    }
  };

  // Message handlers
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await contactAPI.delete(id);
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete message');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-content">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Welcome back, {user?.username}</p>
            </div>
            <div className="admin-stats">
              <div className="stat-card">
                <span className="stat-number">{projects.length}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">Blog Posts</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{messages.length}</span>
                <span className="stat-label">Messages</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="container">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="admin-tabs">
            <button
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button
              className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
              onClick={() => setActiveTab('blog')}
            >
              Blog Posts
            </button>
            <button
              className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              Messages
            </button>
          </div>

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Manage Projects</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowProjectForm(!showProjectForm)}
                >
                  {showProjectForm ? 'Cancel' : 'Add Project'}
                </button>
              </div>

              {showProjectForm && (
                <form className="admin-form" onSubmit={handleProjectSubmit}>
                  {formError && <div className="alert alert-error">{formError}</div>}
                  {formSuccess && <div className="alert alert-success">{formSuccess}</div>}

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={projectForm.title}
                        onChange={handleProjectChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        name="technologies"
                        className="form-input"
                        value={projectForm.technologies}
                        onChange={handleProjectChange}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      className="form-textarea"
                      value={projectForm.description}
                      onChange={handleProjectChange}
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Image URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        className="form-input"
                        value={projectForm.imageUrl}
                        onChange={handleProjectChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repository URL</label>
                      <input
                        type="url"
                        name="repoUrl"
                        className="form-input"
                        value={projectForm.repoUrl}
                        onChange={handleProjectChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Live URL</label>
                    <input
                      type="url"
                      name="liveUrl"
                      className="form-input"
                      value={projectForm.liveUrl}
                      onChange={handleProjectChange}
                    />
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={resetProjectForm}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                    </button>
                  </div>
                </form>
              )}

              <div className="admin-list">
                {projects.length === 0 ? (
                  <p className="empty-message">No projects yet. Create your first project!</p>
                ) : (
                  projects.map((project) => (
                    <div key={project._id} className="admin-list-item">
                      <div className="item-info">
                        <h3>{project.title}</h3>
                        <p>{project.description.substring(0, 100)}...</p>
                        <span className="item-date">{formatDate(project.createdAt)}</span>
                      </div>
                      <div className="item-actions">
                        <button
                          className="btn btn-outline btn-small"
                          onClick={() => handleEditProject(project)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Manage Blog Posts</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowBlogForm(!showBlogForm)}
                >
                  {showBlogForm ? 'Cancel' : 'New Post'}
                </button>
              </div>

              {showBlogForm && (
                <form className="admin-form" onSubmit={handleBlogSubmit}>
                  {formError && <div className="alert alert-error">{formError}</div>}
                  {formSuccess && <div className="alert alert-success">{formSuccess}</div>}

                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      name="title"
                      className="form-input"
                      value={blogForm.title}
                      onChange={handleBlogChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Content *</label>
                    <textarea
                      name="content"
                      className="form-textarea"
                      value={blogForm.content}
                      onChange={handleBlogChange}
                      rows="10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Excerpt</label>
                    <textarea
                      name="excerpt"
                      className="form-textarea"
                      value={blogForm.excerpt}
                      onChange={handleBlogChange}
                      rows="2"
                      placeholder="Brief summary of the post..."
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Cover Image URL</label>
                      <input
                        type="url"
                        name="coverImage"
                        className="form-input"
                        value={blogForm.coverImage}
                        onChange={handleBlogChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tags (comma-separated)</label>
                      <input
                        type="text"
                        name="tags"
                        className="form-input"
                        value={blogForm.tags}
                        onChange={handleBlogChange}
                        placeholder="React, Tutorial, Web Dev"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={resetBlogForm}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? 'Saving...' : editingPost ? 'Update Post' : 'Publish Post'}
                    </button>
                  </div>
                </form>
              )}

              <div className="admin-list">
                {posts.length === 0 ? (
                  <p className="empty-message">No blog posts yet. Write your first article!</p>
                ) : (
                  posts.map((post) => (
                    <div key={post._id} className="admin-list-item">
                      <div className="item-info">
                        <h3>{post.title}</h3>
                        <p>{post.excerpt || post.content.substring(0, 100)}...</p>
                        <span className="item-date">
                          {formatDate(post.createdAt)} • {post.author?.username}
                        </span>
                      </div>
                      <div className="item-actions">
                        <button
                          className="btn btn-outline btn-small"
                          onClick={() => handleEditPost(post)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="admin-section">
              <div className="section-header">
                <h2>Contact Messages</h2>
              </div>

              <div className="admin-list">
                {messages.length === 0 ? (
                  <p className="empty-message">No messages yet.</p>
                ) : (
                  messages.map((message) => (
                    <div key={message._id} className="admin-list-item message-item">
                      <div className="item-info">
                        <div className="message-header">
                          <h3>{message.name}</h3>
                          <a href={`mailto:${message.email}`} className="message-email">
                            {message.email}
                          </a>
                        </div>
                        <p className="message-content">{message.message}</p>
                        <span className="item-date">{formatDate(message.createdAt)}</span>
                      </div>
                      <div className="item-actions">
                        <a
                          href={`mailto:${message.email}`}
                          className="btn btn-outline btn-small"
                        >
                          Reply
                        </a>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => handleDeleteMessage(message._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
