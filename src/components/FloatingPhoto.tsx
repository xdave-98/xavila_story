import { memo } from "react";
import { motion, type PanInfo } from "framer-motion";
import type { FloatingMoment, Point } from "../game/types";

interface Props {
  moment: FloatingMoment;
  onDragMove: (point: Point) => void;
  onDrop: (order: number, point: Point) => void;
  onDragStateChange: (dragging: boolean) => void;
}

// A single memory drifting in the "sky", grabbable and draggable onto the
// timeline. Drift lives on the inner frame (CSS transform) so it never fights
// with framer-motion's drag transform on the outer element.
function FloatingPhotoBase({ moment, onDragMove, onDrop, onDragStateChange }: Props) {
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
      onDragStart={() => onDragStateChange(true)}
      onDrag={(_e, info: PanInfo) => onDragMove(info.point)}
      onDragEnd={(_e, info: PanInfo) => {
        onDragStateChange(false);
        onDrop(moment.order, info.point);
      }}
    >
      <div
        className="photo-frame"
        style={{
          animationDuration: `${4.5 + moment.delay * 1.1}s`,
          animationDelay: `${-moment.delay * 2}s`,
          rotate: `${moment.tilt}deg`,
        }}
      >
        <img src={moment.image} alt={moment.title} draggable={false} />
        <span className="photo-grip" aria-hidden>
          ✦
        </span>
      </div>
    </motion.div>
  );
}

export const FloatingPhoto = memo(FloatingPhotoBase);
