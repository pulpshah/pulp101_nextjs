import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

type AnimateTextProps = {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const AnimateText = ({
  text,
  el,
  className,
  once = true,
  repeatDelay,
}: AnimateTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    const show = () => {
      if (repeatDelay) {
        timeOut = setTimeout(async () => {
          await controls.start("hidden");
          controls.start("visible");
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start("hidden");
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [isInView, controls, repeatDelay]);

  const Wrapper = el || "p";

  return (
    <Wrapper className={className}>
      <motion.span className="sr-only">{text}</motion.span>
      <motion.span
        ref={ref}
        aria-hidden="true"
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
          hidden: {},
        }}
      >
        {textArray.map((line) => (
          <span>
            {line.split(" ").map((word : string) => (
              <span className="inline-block">
                {word.split("").map((char) => (
                  <motion.span
                    className="inline-block"
                    variants={defaultAnimations}
                  >
                    {char}
                  </motion.span>
                ))}
                <span className="inline-block">&nbsp;</span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimateText;
