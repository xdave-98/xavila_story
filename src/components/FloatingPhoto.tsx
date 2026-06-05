import { memo, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import type { CSSProperties } from "react";
import type { FloatingMoment, Point } from "../game/types";

interface Props {
  moment: FloatingMoment;
  onDragMove: (point: Point) => void;
  onDrop: (order: number, point: Point) => void;
  onDragStateChange: (dragging: boolean) => void;
}

// A single memory wandering across the "sky", grabbable and draggable onto the
// timeline. The wander lives on the inner frame (CSS transform) so it never
// fights with framer-motion's drag transform on the outer element. While held,
// the wander animation is paused so the photo doesn't slide out from the cursor.
function FloatingPhotoBase({ moment, onDragMove, onDrop, onDragStateChange }: Props) {
  const [held, setHeld] = useState(false);
  const [p1, p2, p3, p4] = moment.path;

  const frameStyle = {
    animationDuration: `${moment.duration}s`,
    animationDelay: `${-moment.delay}s`,
    animationPlayState: held ? "paused" : "running",
    rotate: `${moment.tilt}deg`,
    "--x1": `${p1.x}vw`,
    "--y1": `${p1.y}vw`,
    "--r1": `${p1.r}deg`,
    "--x2": `${p2.x}vw`,
    "--y2": `${p2.y}vw`,
    "--r2": `${p2.r}deg`,
    "--x3": `${p3.x}vw`,
    "--y3": `${p3.y}vw`,
    "--r3": `${p3.r}deg`,
    "--x4": `${p4.x}vw`,
    "--y4": `${p4.y}vw`,
    "--r4": `${p4.r}deg`,
  } as CSSProperties;

  return (
    <motion.div
      className="floating-photo"
      style={{ left: `${moment.baseX}%`, top: `${moment.baseY}%` }}
      drag
      dragSnapToOrigin
      dragElastic={0.16}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 22 }}
      whileTap={{ cursor: "grabbing" }}
      whileDrag={{ scale: 1.14, zIndex: 60 }}
      onDragStart={() => {
        setHeld(true);
        onDragStateChange(true);
      }}
      onDrag={(_e, info: PanInfo) => onDragMove(info.point)}
      onDragEnd={(_e, info: PanInfo) => {
        setHeld(false);
        onDragStateChange(false);
        onDrop(moment.order, info.point);
      }}
    >
      <div className="photo-frame" style={frameStyle}>
        <img src={moment.image} alt={moment.title} draggable={false} />
        <span className="photo-grip" aria-hidden>
          ✦
        </span>
      </div>
    </motion.div>
  );
}

export const FloatingPhoto = memo(FloatingPhotoBase);
