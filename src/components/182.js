import React, { useEffect, useState, useRef } from 'react';
import './182.css';
import useFontSizeSetter from './fontSizeSetter.js';
import StickyHeader from './StickyHeader.js';
import TermHeader from './TerminalHeader.js';

// Parse the txt file into an array of [number, caption] tuples
function parseImageData(txt) {
  return txt
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line)
    .map((caption, idx) => [idx, caption]);
}

function CoolGalleryTitle({ count }) {
  const total = 182;
  const percent = Math.min(100, Math.round((count / total) * 100));
  let barColor;
  if (percent >= 90) {
    barColor = 'gallery-progress-green';
  } else if (percent >= 50) {
    barColor = 'gallery-progress-yellow';
  } else {
    barColor = 'gallery-progress-red';
  }
  return (
    <div className="gallery-title-wrapper">
      <h1 className="gallery-title">
        182 Picture Gallery
      </h1>
      <div className="gallery-progress-bar-bg">
        <div className={`gallery-progress-bar ${barColor}`} style={{ width: `${percent}%` }} />
        <span className="gallery-progress-label">
          {percent}% complete
        </span>
      </div>
    </div>
  );
}

function ImageGallery({ images }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const modalRef = useRef(null);

  function getImageSrc(num) {
    return `${process.env.PUBLIC_URL}/assets/182Project/${num}.jpg`;
  }

  // Focus the modal for keyboard navigation when opened
  useEffect(() => {
    if (viewerOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [viewerOpen]);

  // Only render a button to open the viewer, not the full gallery grid
  return (
    <div className="gallery-container">
      <button
        className="gallery-open-btn"
        onMouseEnter={e => {
          e.currentTarget.classList.add('gallery-open-btn-hover');
        }}
        onMouseLeave={e => {
          e.currentTarget.classList.remove('gallery-open-btn-hover');
        }}
        onClick={() => {
          setPhotoIndex(0);
          setViewerOpen(true);
          document.body.style.overflow = 'hidden';
        }}
      >
        Open 182 Picture Gallery Viewer
      </button>
      {viewerOpen && images.length > 0 && (
        <div
          className="gallery-fallback-modal"
          ref={modalRef}
          tabIndex={0}
          onMouseDown={e => {
            if (e.target === e.currentTarget) {
              setViewerOpen(false);
              document.body.style.overflow = '';
            }
          }}
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') {
              setPhotoIndex(prev => (prev - 1 + images.length) % images.length);
            } else if (e.key === 'ArrowRight') {
              setPhotoIndex(prev => (prev + 1) % images.length);
            } else if (e.key === 'Escape') {
              setViewerOpen(false);
              document.body.style.overflow = '';
            }
          }}
        >
          {/* Left arrow */}
          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={e => {
              e.stopPropagation();
              setPhotoIndex((photoIndex - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >&lt;</button>
          {/* Image centered */}
          <div
            className="gallery-modal-center"
            onMouseDown={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <img
              src={getImageSrc(images[photoIndex][0])}
              alt={images[photoIndex][1] || `Gallery ${photoIndex + 1}`}
              className="gallery-modal-img"
            />
            <div className="gallery-modal-caption">
              {images[photoIndex][1]}
            </div>
            <div className="gallery-modal-progress">
              {photoIndex + 1} / {images.length} images in gallery
            </div>
            <div className="gallery-modal-close-btn-wrapper">
                <button
                    className="gallery-modal-close-btn"
                    onClick={e => {
                      e.stopPropagation();
                      setViewerOpen(false);
                      document.body.style.overflow = '';
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.classList.add('gallery-modal-close-btn-hover');
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.classList.remove('gallery-modal-close-btn-hover');
                    }}
                >Close</button>
            </div>
          </div>
          {/* Right arrow */}
          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={e => {
              e.stopPropagation();
              setPhotoIndex((photoIndex + 1) % images.length);
            }}
            aria-label="Next image"
          >&gt;</button>
        </div>
      )}
    </div>
  );
}

function Page182({ onExpand }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [images, setImages] = useState([]);
  const bodyRef = useRef(null);
  const title = "182 Picture Gallery";

  useFontSizeSetter();

  // Fetch images.txt from public/assets/182Project/images.txt at runtime
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/182Project/images.txt`)
      .then(res => res.text())
      .then(txt => setImages(parseImageData(txt)));
  }, []);

  // Handle terminal collapse after completion
  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        setIsExpanded(false); // Collapse the terminal
      }, 100);
    }
  }, [isComplete]);

  // Expand the terminal initially
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
      if (onExpand) onExpand(); // Notify parent
    }, 200);

    return () => clearTimeout(timer);
  }, [onExpand]);

  return (
    <div className={`main-page-wrapper ${isExpanded ? 'expanded' : ''}`}>
      <TermHeader headerTitle={title} />
      <div ref={bodyRef} className="contact-content">
        <StickyHeader
          bodyRef={bodyRef}
          setIsComplete={setIsComplete}
        />
        <div className="gallery-content-custom">
          <CoolGalleryTitle count={images.length} />
          <ImageGallery images={images} />
        </div>
      </div>
    </div>
  );
}

export default Page182;