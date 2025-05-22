'use client'
import { useEffect, useState, useRef } from "react";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = () => {
      setIsHovering(true);
      if (cursorRef.current) {
        cursorRef.current.classList.add(styles.hover);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      if (cursorRef.current) {
        cursorRef.current.classList.remove(styles.hover);
      }
    };

    // Add hover detection for interactive elements
    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        handleMouseEnter();
      } else {
        handleMouseLeave();
      }
    };

    // Hide default cursor
    document.body.style.cursor = 'none';

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleLinkHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleLinkHover);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${isClicking ? styles.clicking : ''} ${isHovering ? styles.hover : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <div className={styles.cursorRing}></div>
      <div className={styles.cursorDot}></div>
      <div className={styles.cursorBullet}></div>
    </div>
  );
};

export default CustomCursor; 