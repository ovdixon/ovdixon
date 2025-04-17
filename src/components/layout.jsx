import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router';
import { Header } from './header';

export function Layout() {
    const [dragOffset, setDragOffset] = useState(0);
    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);

    function handleMouseLeave() {
        if (isDraggingRef.current) {
            handleMouseUp();
        }
    }

    function handleMouseDown(e) {
        isDraggingRef.current = true;
        startYRef.current = e.clientY - dragOffset;
        document.body.style.cursor = 'grabbing';
        if (e.currentTarget) {
            e.currentTarget.style.cursor = 'grabbing';
        }
        e.preventDefault();
    }

    function handleMouseMove(e) {
        if (!isDraggingRef.current) return;
        const newOffset = e.clientY - startYRef.current;
        setDragOffset(Math.max(newOffset, 0));
    }

    function handleMouseUp() {
        if (isDraggingRef.current) {
            isDraggingRef.current = false;
            document.body.style.cursor = '';
            setDragOffset(0);
        }
    }

    return (
        <div
            className="flex flex-col h-screen overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
               <defs>
                    <filter id="noise">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.002"
                            numOctaves="3"
                            result="noise"
                        >
                            <animate
                                attributeName="baseFrequency"
                                values="0.001;0.003;0.001"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="100" />
                    </filter>
                </defs>
            </svg>

            <div
                data-draggable-header
                className='bg-white'
                style={{
                    transform: `translateY(${dragOffset}px)`,
                    transition: isDraggingRef.current ? 'none' : 'transform 0.4s ease-out',
                    position: 'relative',
                    zIndex: 999
                }}
            >
                <div className="mx-auto max-w-3xl">
                    <Header
                        onBored={handleMouseDown}
                        isDragging={isDraggingRef.current} 
                    />
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 overflow-y-auto z-[1]">
                    <div className="mx-auto max-w-3xl pt-8 pb-8">
                       <Outlet />
                    </div>
                </div>
                <div
                    className="absolute top-0 left-0 right-0 pointer-events-none z-[2]"
                    style={{
                        height: dragOffset,
                        overflow: 'hidden',
                        filter: 'url(#noise)',
                        backgroundColor: '#fff',
                    }}
                >
                    <div className="mx-auto max-w-3xl pt-8 pb-8">
                        <Outlet />
                     </div>
                </div>
            </div>
        </div>
    );
}