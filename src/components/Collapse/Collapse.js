import React, { useRef, useState, useEffect } from 'react';

const BROWSER_DELAY = 100;

const Collapse = ({
    className,
    initialHeight = 0,
    children,
    isOpened = false,
}) => {
    const canUpdate = useRef(false);
    const timer = useRef(undefined);
    const rootNode = useRef(null);
    const [height, setHeight] = useState(`${initialHeight}px`);
    const duration = 300;
    const transition = `height ${duration / 1000}s`;

    const animateSlide = (finalHeight, delay) => {
        if (!rootNode.current) {
            return;
        }
        setHeight(`${rootNode.current.scrollHeight}px`);
        timer.current = window.setTimeout(() => {
            setHeight(finalHeight);
        }, delay);
    };

    useEffect(() => {
        switch (true) {
            case !canUpdate.current && isOpened:
                setHeight('auto');
                break;
            case !canUpdate.current && !isOpened:
                setHeight(`${initialHeight}px`);
                break;
            case isOpened:
                animateSlide('auto', duration);
                break;
            default:
                animateSlide(`${initialHeight}px`, BROWSER_DELAY);
        }

        canUpdate.current = true;

        return () => clearTimeout(timer.current);
    }, [isOpened, initialHeight, duration]);

    return (
        <div
            className={className}
            style={{ overflow: 'hidden', width: '100%', height, transition }}
            ref={rootNode}
        >
            {children}
        </div>
    );
};

export default Collapse;