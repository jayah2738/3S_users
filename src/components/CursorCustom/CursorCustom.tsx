
import { useEffect, useState } from "react";
import styles from "./CustomCursor.module.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
      setVisible(window.innerWidth > 768); // Show cursor only if screen is wider than 768px
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    handleResize(); // Check screen size on load

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    visible && (
      <div
        className={styles.cursor}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
      </div>
    )
  );
};
export default CustomCursor;

