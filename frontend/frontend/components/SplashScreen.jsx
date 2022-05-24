import React, { useState, useEffect, useMemo } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { IoCalendarOutline } from "react-icons/io5";
import { useRouter } from "next/dist/client/router";
import styles from "../styles/SplashScreen.module.scss";
import Link from "next/link";

const WALKTHROUGH_ICONS = [
  "/walkthrough01.png",
  "/walkthrough02.png",
  "/walkthrough03.png",
];

const WALKTHROUGH_TEXTS = [
  "ویزیت با بهترین پزشکان فوق تخصص",
  "سفارش آنلاین دارو و ارسال رایگان",
  "نمونه‌گیری آزمایش در منزل",
];
const pageStyle = {
  position: "absolute",
  width: "100%",
  height: "100%",
};

export const Page = (props) => {
  const { index, renderPage, x, onDragEnd } = props;
  const child = React.useMemo(() => renderPage(index), [index, renderPage]);
  // const child = renderPage(index);

  return (
    <motion.div
      style={{
        ...pageStyle,
        x,
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
const Dots = (props) => {
  const { index, setIndex, count } = props;

  const dots = useMemo(() => [...Array(count).keys()], [count]);

  console.log("Dot count", count, dots);

  return (
    <div
      className={`d-flex flex-row-reverse justify-content-center ${styles.dotscnt}`}
    >
      {dots.map((_, ind) => {
        console.log("Rendering dots", ind, count);
        return (
          <div
            className={`${styles.dot} ${
              (count + (index % count)) % count === ind ? styles.dotactive : ""
            }`}
            onClick={() => setIndex(ind)}
          ></div>
        );
      })}
    </div>
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
      if (index > 0) setIndex(index - 1);
      else animate(x, calculateNewX(), transition);
    } else if (offset.x < -clientWidth / 4) {
      if (index < count - 1) setIndex(index + 1);
      else animate(x, calculateNewX(), transition);
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
            onDragEnd={handleEndDrag}
            index={rangeValue + index}
            renderPage={children}
          />
        ))}
      </motion.div>
    </div>
  );
};

const NotificationCarousel = (props) => {
  const [index, setIndex] = useState(0);
  const [isOpen, setOpen] = useState(
    localStorage.getItem("seen_splash") !== "1"
  );

  return (
    <div
      className={`position-relative d-flex d-md-none flex-column justify-content-start align-items-stretch ${
        styles.cnt
      } ${isOpen ? "" : "d-none"}`}
    >
      <div
        className={`d-flex flex-row justify-content-center align-items-center ${styles.header}`}
      >
        {/* <MainIcon alt="کینیک غدد" className={`${styles.mainicn}`} /> */}
      </div>
      <div
        className={`d-flex justify-content-center align-items-center ${styles.carousel}`}
      >
        <VirtualizedPage
          count={WALKTHROUGH_ICONS.length}
          index={index}
          setIndex={setIndex}
        >
          {(index) => {
            if (index >= WALKTHROUGH_ICONS.length || index < 0) {
              return <div></div>;
            }
            const Icon = { icon: WALKTHROUGH_ICONS[index] };
            console.log(index, Icon);
            const Text = WALKTHROUGH_TEXTS[index];
            return (
              <div
                className={`d-flex flex-column align-items-center ${styles.pagecnt}`}
              >
                {/*<Icon.icon className={`${styles.icon}`}/>*/}
                <Image src={Icon.icon} width={"400px"} height={"400px"} />
                <div className={`${styles.text}`}>{Text}</div>
              </div>
            );
          }}
        </VirtualizedPage>
      </div>
      <div className={`d-flex flex-column m-2 ${styles.btncnt}`}>
        <div
          className={`align-self-end ${index < 2 ? "" : "d-none"} ${
            styles.link
          }`}
          onClick={() => {
            setOpen(false);
            localStorage.setItem("seen_splash", 1);
            // setIndex(index + 1)
          }}
        >
          ردکردن
        </div>
        <div
          className={`align-self-start ${styles.link} ${
            index == 2 ? "" : "d-none"
          }`}
          onClick={() => {
            setOpen(false);
            localStorage.setItem("seen_splash", 1);
          }}
        >
          ثبت‌نام
        </div>
      </div>
    </div>
  );
};

export default NotificationCarousel;
