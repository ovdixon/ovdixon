import React, { useState } from 'react';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from './catalyst/navbar';

export function Header({ onBored, isDragging }) {
  const [boredButton, setBoredButton] = useState('Bored?');

  const navClasses = [
    "font-mono",
    "border-b",     
    "border-black",
  ];

  if (isDragging) {
    navClasses.push("border-t");
  }

  return (
    <Navbar className={navClasses.join(" ")}>
      <NavbarSection>
        <NavbarItem href="/">Ovdixon</NavbarItem>
        <NavbarItem href="/projects">Work</NavbarItem>
      </NavbarSection>

      <NavbarSpacer />

      <NavbarSection>
        <div
          onMouseEnter={() => setBoredButton('Drag down ↓')}
          onMouseLeave={() => {
             // Logic to reset button text (remains the same)
             if (!document.body.style.cursor.includes('grabbing')) {
                 setBoredButton('Bored?');
             } else {
                 setTimeout(() => {
                    setBoredButton('Bored?');
                 }, 150);
             }
          }}
          onMouseDown={onBored}
          className="grabbable text-base/6 font-medium text-zinc-950 sm:text-sm/5 cursor-grab select-none"
          title="Click and drag down"
        >
          { isDragging ? 'Drag down ↓' : boredButton }
        </div>
      </NavbarSection>
    </Navbar>
  );
}