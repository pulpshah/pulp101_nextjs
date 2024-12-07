'use client';

import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function ToolbarOverlay({ children }: { children: React.ReactNode }) {
  const [isOverlayActive, setIsOverlayActive] = useState(false); // Toggle for overlay mode
  const [isSelecting, setIsSelecting] = useState(false); // For rectangle selection
  const [selectionStart, setSelectionStart] = useState<{ x: number; y: number } | null>(null);
  const [selectionRect, setSelectionRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [cart, setCart] = useState<{ id: string; text?: string; screenshot?: string }[]>([]);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null); // Tracks the current highlight
  const [isTextHighlightVisible, setIsTextHighlightVisible] = useState(false); // Text highlighting toolbar
  const [position, setPosition] = useState({ top: 0, left: 0 }); // Toolbar position for text highlight
  const [toolbarPosition, setToolbarPosition] = useState({ top: 100, left: 100 }); // Draggable toolbar initial position
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0); // Rotation for toolbar based on snapping

  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  const snappoints = [
    { top: 10, left: 10, rotation: 0 }, // Top-left (inner)
    { top: 50, left: 50, rotation: 0 }, // Top-left (outer)
    { top: 10, left: 'calc(100% - 60px)', rotation: 90 }, // Top-right (inner)
    { top: 50, left: 'calc(100% - 90px)', rotation: 90 }, // Top-right (outer)
    { top: 'calc(100% - 60px)', left: 10, rotation: 270 }, // Bottom-left (inner)
    { top: 'calc(100% - 90px)', left: 50, rotation: 270 }, // Bottom-left (outer)
    { top: 'calc(100% - 60px)', left: 'calc(100% - 60px)', rotation: 180 }, // Bottom-right (inner)
    { top: 'calc(100% - 90px)', left: 'calc(100% - 90px)', rotation: 180 }, // Bottom-right (outer)
    { top: '50%', left: 10, rotation: 270 }, // Left-middle
    { top: '50%', left: 'calc(100% - 60px)', rotation: 90 }, // Right-middle
    { top: 10, left: '50%', rotation: 0 }, // Top-middle
    { top: 'calc(100% - 60px)', left: '50%', rotation: 180 }, // Bottom-middle
  ];

  const findClosestSnappoint = (current: { top: number; left: number }) => {
    let closest = snappoints[0];
    let minDistance = Infinity;

    snappoints.forEach((point) => {
      const resolvedLeft =
        typeof point.left === 'string'
          ? (parseFloat(point.left) / 100) * window.innerWidth
          : point.left;
      const resolvedTop =
        typeof point.top === 'string'
          ? (parseFloat(point.top) / 100) * window.innerHeight
          : point.top;

      const distance = Math.sqrt(
        Math.pow(resolvedLeft - current.left, 2) + Math.pow(resolvedTop - current.top, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = { top: resolvedTop, left: resolvedLeft, rotation: point.rotation };
      }
    });

    return closest;
  };

  // **TOGGLE FUNCTIONALITY**
  const toggleOverlay = () => {
    setIsOverlayActive(!isOverlayActive);
    setSelectionRect(null);
    setSelectionStart(null);
    setIsTextHighlightVisible(false); // Hide text toolbar when toggling
  };

  // **TEXT HIGHLIGHT FUNCTIONALITY**
  useEffect(() => {
    if (!isOverlayActive) {
      const handleMouseUp = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim()) {
          const range = selection.getRangeAt(0);

          // Check if the range contains only text nodes
          try {
            const highlightSpan = document.createElement('span');
            highlightSpan.style.backgroundColor = 'lightpink';
            highlightSpan.dataset.id = `${Date.now()}`;
            highlightSpan.className = 'highlighted';
            range.surroundContents(highlightSpan);

            setHighlightedElement(highlightSpan); // Track the highlighted element
            setSelectedText(selection.toString());
            setPosition({
              top: range.getBoundingClientRect().top + window.scrollY - 50,
              left: range.getBoundingClientRect().left + window.scrollX,
            });
            setIsTextHighlightVisible(true);
          } catch {
            // Invalid selection (non-text node or mixed content), ignore
            setSelectedText(null);
            setIsTextHighlightVisible(false);
          }
        } else {
          setIsTextHighlightVisible(false);
        }
      };

      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isOverlayActive]);

  const addTextToCart = () => {
    if (selectedText && highlightedElement) {
      setCart((prev) => [
        ...prev,
        { id: highlightedElement.dataset.id || '', text: selectedText },
      ]);
      setSelectedText(null);
      setIsTextHighlightVisible(false);
      setHighlightedElement(null); // Clear the current highlight reference
    }
  };

  const discardHighlight = () => {
    if (highlightedElement) {
      highlightedElement.style.backgroundColor = ''; // Remove the highlight
    }
    setSelectedText(null);
    setIsTextHighlightVisible(false);
    setHighlightedElement(null); // Clear the current highlight reference
  };

  // **START SELECTION ON MOUSEDOWN**
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOverlayActive) {
      setIsSelecting(true);
      setSelectionStart({ x: e.pageX, y: e.pageY });
    }
  };

  // **UPDATE SELECTION RECTANGLE ON MOUSEMOVE**
  const handleMouseMove = (e: MouseEvent) => {
    if (isSelecting && selectionStart) {
      const x = Math.min(e.pageX, selectionStart.x);
      const y = Math.min(e.pageY, selectionStart.y);
      const width = Math.abs(e.pageX - selectionStart.x);
      const height = Math.abs(e.pageY - selectionStart.y);

      setSelectionRect({ x, y, width, height });
    }

    // Dragging toolbar
    if (isDragging && dragStartRef.current) {
      const { x, y } = dragStartRef.current;
      setToolbarPosition((prev) => ({
        top: prev.top + e.clientY - y,
        left: prev.left + e.clientX - x,
      }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  // **FINISH SELECTION AND CAPTURE SCREENSHOT ON MOUSEUP**
  const handleMouseUp = async (e: MouseEvent) => {
    if (isOverlayActive && isSelecting && selectionRect) {
      setIsSelecting(false);

      const { x, y, width, height } = selectionRect;

      if (overlayRef.current) {
        // Capture screenshot with html2canvas
        const canvas = await html2canvas(document.body, {
          x,
          y,
          width,
          height,
          backgroundColor: null, // Transparent background
        });

        const screenshot = canvas.toDataURL();
        setCart((prev) => [...prev, { id: `${Date.now()}`, screenshot }]);
      }

      // Reset selection rectangle
      setSelectionRect(null);
      setSelectionStart(null);
    }

    if (isDragging) {
        const closest = findClosestSnappoint({top: e.clientY, left: e.clientX });
        setToolbarPosition({ 
          top: parseInt(closest.top as string), 
          left: parseInt(closest.left as string) 
      });
        setRotation(closest.rotation); // Rotate toolbar based on snappoint
        setIsDragging(false);
        dragStartRef.current = null;
      }  
  };

  // Attach global mousemove and mouseup listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSelecting, selectionStart, isDragging]);

  // **REMOVE ITEM FROM THREAD**
  const removeFromThread = (id: string) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      const highlight = document.querySelector(`span[data-id='${id}']`);
      if (highlight instanceof HTMLElement) {
          highlight.style.backgroundColor = ''; // Remove highlight color
      }

      return updatedCart;
    });
  };

  return (
    <>
      {/* Draggable Floating Toolbar */}
      <div
        style={{
          position: 'fixed',
          top: toolbarPosition.top,
          left: toolbarPosition.left,
          background: '#222',
          color: '#fff',
          padding: '10px',
          borderRadius: '24px',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={(e) => {
          setIsDragging(true);
          dragStartRef.current = { x: e.clientX, y: e.clientY };
        }}
      >
        <button
          style={{
            background: isOverlayActive ? '#DC3545' : '#007BFF',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={toggleOverlay}
        >
          Toggle
        </button>
      </div>

      {/* Text Highlight Toolbar */}
      {!isOverlayActive && isTextHighlightVisible && (
        <div
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            background: '#333',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '8px',
            zIndex: 1000,
            display: 'flex',
            gap: '8px',
          }}
        >
          <button
            onClick={addTextToCart}
            style={{
              background: '#28A745',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={discardHighlight}
            style={{
              background: '#DC3545',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Discard
          </button>
        </div>
      )}

      {/* Overlay for Screenshot Mode */}
      {isOverlayActive && (
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent', // Transparent background
            zIndex: 999,
            cursor: 'crosshair',
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Selection Rectangle */}
          {selectionRect && (
            <div
              style={{
                position: 'absolute',
                top: selectionRect.y,
                left: selectionRect.x,
                width: selectionRect.width,
                height: selectionRect.height,
                border: '2px dashed #007BFF',
                zIndex: 1000,
              }}
            ></div>
          )}
        </div>
      )}

      {/* Thread View */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px',
          borderRadius: '8px',
          maxWidth: '300px',
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 1000,
        }}
      >
        <h4>Thread</h4>
        {cart.map((item) =>
          item.screenshot ? (
            <div key={item.id}>
              <img src={item.screenshot} alt="Screenshot" style={{ width: '100%' }} />
              <button onClick={() => removeFromThread(item.id)}>✕</button>
            </div>
          ) : (
            <div key={item.id}>
              <p>{item.text}</p>
              <button onClick={() => removeFromThread(item.id)}>✕</button>
            </div>
          )
        )}
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', marginTop: '50px' }}>{children}</div>
    </>
  );
}
