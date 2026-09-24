"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MenuItemGallery({ category }) {
  const prefersReducedMotion = useReducedMotion();
  const items = category?.items ?? [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPointerInside, setIsPointerInside] = useState(false);

  const touchStartY = useRef(null);
  const wheelLockRef = useRef(false);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    const allowPageScroll = !isPointerInside;

    body.style.overflow = allowPageScroll
      ? previousBodyOverflow
      : "hidden";

    html.style.overflow = allowPageScroll
      ? previousHtmlOverflow
      : "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [isPointerInside]);

  const moveToSection = useCallback(() => {
    const nextSection = document.querySelector(
      ".site-footer, footer, .home-footer, .menu-gallery-section + *"
    );

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollBy({
        top: 420,
        behavior: "smooth",
      });
    }
  }, []);

  const advanceDish = useCallback(
    (direction) => {
      if (wheelLockRef.current || items.length === 0) return;

      wheelLockRef.current = true;

      if (direction > 0 && activeIndex >= items.length - 1) {
        moveToSection();

        setTimeout(() => {
          wheelLockRef.current = false;
        }, 350);

        return;
      }

      setActiveIndex((current) => {
        const next = Math.min(
          items.length - 1,
          Math.max(0, current + direction)
        );

        return next;
      });

      setTimeout(() => {
        wheelLockRef.current = false;
      }, 350);
    },
    [activeIndex, items.length, moveToSection]
  );

  const handleWheel = useCallback(
    (event) => {
      if (!isPointerInside) return;

      const delta = event.deltaY || event.deltaX;

      if (Math.abs(delta) < 12) return;

      event.preventDefault();
      advanceDish(delta > 0 ? 1 : -1);
    },
    [advanceDish, isPointerInside]
  );

  const handleTouchStart = useCallback((event) => {
    touchStartY.current = event.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      if (!isPointerInside) return;
      if (touchStartY.current === null) return;

      const diff =
        touchStartY.current - event.changedTouches[0].clientY;

      touchStartY.current = null;

      if (Math.abs(diff) < 30) return;

      advanceDish(diff > 0 ? 1 : -1);
    },
    [advanceDish, isPointerInside]
  );

  const item = items[activeIndex];

  if (!item) return null;

  return (
    <div className="menu-stack-shell">
      <div
        className="menu-stack-stage"
        onMouseEnter={() => setIsPointerInside(true)}
        onMouseLeave={() => setIsPointerInside(false)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
        aria-label={`${category?.name} dishes`}
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={`${category?.id}-${item.name}`}
            className="menu-stack-card is-active"
            initial={
              prefersReducedMotion
                ? false
                : { opacity: 0, y: 24 }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -18 }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="menu-stack-image">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 767px) 100vw, 420px"
                priority
              />

              <span className="menu-gallery-number">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <span className="menu-gallery-category">
                {category?.name}
              </span>
            </div>

            <div className="menu-stack-copy">
              <motion.p
                className="eyebrow"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: -18 }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  delay: 0.04,
                }}
              >
                PLATE {String(activeIndex + 1).padStart(2, "0")}
              </motion.p>

              <motion.h3
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: -28 }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: 0.08,
                }}
              >
                {item.name}
              </motion.h3>

              <motion.p
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: -22 }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  delay: 0.14,
                }}
              >
                {item.description}
              </motion.p>

              <motion.span
                className="menu-gallery-rule"
                initial={
                  prefersReducedMotion
                    ? false
                    : { scaleX: 0, opacity: 0 }
                }
                animate={{
                  scaleX: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  delay: 0.16,
                }}
              />
            </div>

            <span
              className={`menu-gallery-accent is-${item.accentPosition}`}
              aria-hidden="true"
            />
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}