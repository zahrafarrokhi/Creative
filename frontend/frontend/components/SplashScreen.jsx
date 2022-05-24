import React, { useState, useEffect, useMemo } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import { useRouter } from "next/dist/client/router";
// import styles from "../styles/SplashScreen.module.scss";
import Link from "next/link";

const pageStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

export const Page = ({
  index,
  renderPage,
  pos,
  x,
  y,
  onDragEnd,
  clientHeight,
  progress,
  onDrag,
}) => {
  const child = React.useMemo(() => renderPage({ index }), [index, renderPage]);

  return (
    <motion.div
      style={{
        ...pageStyle,
        x,
        y,
        left: `${index * 100}%`,
      }}
      className="w-100 d-flex align-items-center justify-content-center"
      draggable
      drag="x"
      dragElastic={1}
      onDragEnd={onDragEnd}
    >
      {child}
    </motion.div>
  );
};

const range = [-1, 0, 1];

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflowX: "hidden",
  // overflowY: 'hidden',
};

const transition = {
  type: "spring",
  bounce: 0,
};

const VirtualizedPage = ({ children, count, index, setIndex }) => {
  const x = useMotionValue(0);
  // const y = useMotionValue(0);
  // const progress = useMotionValue(0);
  const containerRef = React.useRef(null);

  const calculateNewX = () => -index * (containerRef.current?.clientWidth || 0);

  const handleEndDrag = (e, dragProps) => {
    const clientWidth = containerRef.current?.clientWidth || 0;
    // const clientHeight = containerRef.current?.clientHeight || 0;

    const { offset, velocity } = dragProps;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition);
      return;
    }

    if (offset.x > clientWidth / 4) {
      setIndex(index - 1);
      // else animate(x, calculateNewX(), transition);
    } else if (offset.x < -clientWidth / 4) {
      setIndex(index + 1);
      // else animate(x, calculateNewX(), transition);
    } else {
      animate(x, calculateNewX(), transition);
    }
  };

  React.useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    // const controls = animate(y, calculateNewY(), transition);
    return controls.stop;
  }, [index]);

  return (
    <div
      className={`d-flex w-100 h-100 align-items-center justify-content-center `}
    >
      <motion.div
        ref={containerRef}
        className="d-flex flex-grow-1 align-items-center justify-content-center"
        style={containerStyle}
      >
        {range.map((rangeValue) => (
          <Page
            key={rangeValue + index}
            x={x}
            // y={y}
            pos={rangeValue}
            // progress={progress}
            onDragEnd={handleEndDrag}
            // onDrag={handleDrag}
            clientHeight={containerRef.current?.clientHeight || 1}
            index={rangeValue + index}
            renderPage={children}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default VirtualizedPage;
