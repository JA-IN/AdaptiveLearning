import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

/**
 * CountUp component — animates a number from 0 to the target value
 * Triggers when the element scrolls into view.
 *
 * @param {number}  end        — target number
 * @param {string}  suffix     — suffix like "+", "%", "K+" (default: "")
 * @param {string}  prefix     — prefix like "$" (default: "")
 * @param {number}  duration   — animation duration in ms (default: 2000)
 * @param {string}  className  — CSS class for the wrapper span
 */
const CountUp = ({ end, suffix = "", prefix = "", duration = 2000, className = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!isInView || hasStarted.current) return;
        hasStarted.current = true;

        const startTime = performance.now();
        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutQuart for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * end));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [isInView, end, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    );
};

export default CountUp;
