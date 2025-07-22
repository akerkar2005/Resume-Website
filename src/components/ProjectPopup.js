import React, { useEffect, useRef } from 'react';
import './ProjectPopup.css';

function ProjectPopup({ open, project, onClose, onPrev, onNext, /* animating, direction, */ total, index }) {
  const modalRef = useRef(null);

  // Focus for keyboard navigation
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open, project]);

  if (!open || !project) return null;

  return (
    <div
      className="project-popup-modal"
      ref={modalRef}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') onPrev();
        else if (e.key === 'ArrowRight') onNext();
        else if (e.key === 'Escape') onClose();
      }}
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="project-popup-content"
        onMouseDown={e => e.stopPropagation()}
      >
        <button className="project-popup-arrow left" onClick={onPrev}>&lt;</button>
        <div className="project-popup-main">
          <div className="project-popup-title">{project[0]}</div>
          <div className="project-popup-date">{project[1]}</div>
          <div className="project-popup-desc">{project[2]}</div>
          <div className="project-popup-icon">{project[3]}</div>
          <div className="project-popup-link">
            <a href={project[4]} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </div>
          <div className="project-popup-progress">
            {index + 1} / {total}
          </div>
        </div>
        <button className="project-popup-arrow right" onClick={onNext}>&gt;</button>
        <button className="project-popup-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default ProjectPopup;
