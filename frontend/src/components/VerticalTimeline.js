import React, { useState, useRef, useEffect } from 'react';
import './VerticalTimeline.css';

// Get start year for timeline boundaries
function getStartYear(dateStr) {
  if (!dateStr) return '';
  const [start] = dateStr.split('-');
  if (start && start.includes('/')) return start.split('/')[2];
  if (start && start.length === 4) return start;
  return '';
}

// Now expect: VerticalTimeline({ projects, iconSize })
const VerticalTimeline = ({ projects, iconSize = 72 }) => {
  const [selected, setSelected] = useState(null);
  const [popupTop, setPopupTop] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [queued, setQueued] = useState(null);
  const timelineContainerRef = useRef(null);
  const dotRefs = useRef([]);
  const lineRef = useRef(null);

  const timelineItems = [];

  // Always add "present" at the top
  timelineItems.push({ type: 'special', label: 'present', key: 'special-present', present: true });

  projects.forEach(([title, date, desc, icon, link], idx) => {
    const year = getStartYear(date);
    timelineItems.push({ type: 'project', title, date, desc, icon, link, idx, year, key: `proj-${idx}` });

    // If this is the last project or the next project is a different year, add year boundary below
    const nextYear = projects[idx + 1] ? getStartYear(projects[idx + 1][1]) : null;
    if (year && year !== nextYear) {
      timelineItems.push({ type: 'year', year, key: `year-${year}-${idx}` });
    }
  });

  // --- Calculate the height for the vertical line so it ends at the Present boundary ---
  useEffect(() => {
    if (!lineRef.current) return;
    // Find the Present boundary element
    const presentBoundary = lineRef.current.querySelector('.present-boundary');
    // Find the last year boundary (earliest year)
    const yearBoundaries = lineRef.current.querySelectorAll('.timeline-year-boundary');
    let lastYearBoundary = null;
    yearBoundaries.forEach(boundary => {
      if (
        boundary !== presentBoundary &&
        (!lastYearBoundary ||
          boundary.offsetTop > lastYearBoundary.offsetTop)
      ) {
        lastYearBoundary = boundary;
      }
    });

    // if (presentBoundary && lastYearBoundary) {
    //   const lineRect = lineRef.current.getBoundingClientRect();
    //   const presentRect = presentBoundary.getBoundingClientRect();
    //   const lastRect = lastYearBoundary.getBoundingClientRect();
    //   // Start at present, end a bit above the last year boundary (shorten by 64px instead of 24px)
    //   const start = presentRect.top + presentRect.offsetHeight / 2 - lineRect.top;
    //   const end = lastRect.top + lastRect.offsetHeight / 2 - lineRect.top - 64;
    //   // Defensive: only set if end > start
    //   const height = Math.max(0, end - start - 200);
    //   lineRef.current.style.setProperty('--timeline-line-start', `${start}px`);
    //   lineRef.current.style.setProperty('--timeline-line-height', `${height}px`);
    //   // Debug: log values to verify
    //   console.log('Timeline line start:', start, 'end:', end, 'height:', height);
    // }
  }, [timelineItems.length]);

  // Set popup position when selected changes
  useEffect(() => {
    if (
      selected !== null &&
      dotRefs.current[selected] &&
      timelineContainerRef.current
    ) {
      const dotRect = dotRefs.current[selected].getBoundingClientRect();
      const containerRect = timelineContainerRef.current.getBoundingClientRect();
      setPopupTop(dotRect.top - containerRect.top);
    }
  }, [selected, timelineItems.length]);

  // Close popup when clicking outside
  useEffect(() => {
    if (selected === null) return;
    const handleClick = (e) => {
      // Only close if click is outside popup and icons
      const popup = document.querySelector('.timeline-popup-vertical');
      const icons = document.querySelectorAll('.timeline-icon');
      const isIcon = Array.from(icons).some(icon => icon.contains(e.target));
      if (
        popup &&
        !popup.contains(e.target) &&
        !isIcon
      ) {
        setSelected(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selected]);

  // Handle switching between projects with exit animation
  useEffect(() => {
    if (exiting) {
      const timeout = setTimeout(() => {
        setExiting(false);
        setSelected(queued);
        setQueued(null);
      }, 200); // match CLOSE_ANIMATION_DURATION
      return () => clearTimeout(timeout);
    }
  }, [exiting, queued]);

  const handleDotClick = (idx) => {
    if (exiting) return; // Prevent double clicks during exit
    if (selected === idx) {
      setExiting(true);
      setQueued(null);
    } else if (selected !== null) {
      setExiting(true);
      setQueued(idx);
    } else {
      setSelected(idx);
    }
  };

  // Render
  return (
    <div className="timeline-encapsulated-container" ref={timelineContainerRef} style={{position: 'relative'}}>
      <div className="vertical-timeline-scroll left-aligned">
        <div
          className="vertical-timeline-line left-aligned-line"
          ref={lineRef}
        >
          {timelineItems.map((item, idx) => {
            if (item.type === 'special') {
              return (
                <div
                  className="timeline-year-boundary present-boundary"
                  key={item.key}
                >
                  <span
                    className="timeline-year-horizontal"
                  />
                  <div
                    className="timeline-year-label"
                  >
                    {item.label === 'present' ? 'present' : `earliest: ${item.label}`}
                  </div>
                </div>
              );
            }
            if (item.type === 'year') {
              return (
                <div className="timeline-year-boundary" key={item.key}>
                  <span className="timeline-year-horizontal" />
                  <div className="timeline-year-label">{item.year}</div>
                </div>
              );
            }
            // project
            return (
              <div className="timeline-item left-aligned-item" key={item.key}>
                <div
                  className="timeline-icon"
                  ref={el => dotRefs.current[item.idx] = el}
                  onClick={() => handleDotClick(item.idx)}
                  tabIndex={0}
                  aria-label={item.title}
                  style={{
                    width: iconSize,
                    height: iconSize,
                    fontSize: iconSize * 0.78,
                    minWidth: iconSize,
                    minHeight: iconSize,
                    maxWidth: iconSize,
                    maxHeight: iconSize,
                  }}
                >
                  {React.isValidElement(item.icon)
                    ? React.cloneElement(item.icon, {
                        style: {
                          width: iconSize * 0.89,
                          height: iconSize * 0.89,
                          display: 'block',
                          objectFit: 'contain',
                        }
                      })
                    : item.icon}
                </div>
                <div className="timeline-label left-aligned-label">
                  <div className="timeline-title" style={{ maxWidth: 260, whiteSpace: 'normal', overflow: 'visible', textOverflow: 'clip' }}>
                    {item.title}
                  </div>
                  <div className="timeline-date">
                    {"Date: " + item.date}
                  </div>
                </div>
              </div>
            );
          })}
          {/* Add extra padding at the end for popup overflow */}
          <div style={{ height: '220px', width: '100%' }} />
        </div>
      </div>
      <div className="timeline-popup-outer" style={{position: 'absolute', left: '32vw', top: 0, width: '68vw', height: '100%', pointerEvents: 'none'}}>
        {selected !== null && (
          <div
            className={`timeline-popup-vertical${exiting ? ' popup-rotate-out' : ''}`}
            style={{
              position: 'absolute',
              top: popupTop,
              left: 0,
              pointerEvents: 'auto'
            }}
          >
            <div className="timeline-popup-title">{projects[selected][0]}</div>
            <div className="timeline-popup-desc">{projects[selected][2]}</div>
            {projects[selected][4] && (
              <a
                href={projects[selected][4]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1976d2', fontWeight: 500, marginTop: 12, textDecoration: 'underline' }}
              >
                Visit Project
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalTimeline;