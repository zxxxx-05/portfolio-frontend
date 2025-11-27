import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const { _id, title, description, imageUrl, technologies, repoUrl, liveUrl } = project;

  return (
    <article className="project-card card">
      <div className="project-image">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="project-placeholder">
            <span>{title.charAt(0)}</span>
          </div>
        )}
        <div className="project-overlay">
          <div className="project-links">
            {repoUrl && (
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-small">
                Code
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-small">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        {technologies && technologies.length > 0 && (
          <div className="project-tags">
            {technologies.slice(0, 4).map((tech, index) => (
              <span key={index} className="tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
