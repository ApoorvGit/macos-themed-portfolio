// Keyboard shortcuts
export const SHORTCUTS = {
  CLOSE_WINDOW: 'Meta+w', // Cmd+W on Mac
  MINIMIZE_WINDOW: 'Meta+m', // Cmd+M on Mac
  CYCLE_WINDOWS: 'Meta+Tab', // Cmd+Tab on Mac
} as const;

// Keyboard handler helper
export const handleKeyDown = (
  event: KeyboardEvent,
  handlers: Record<string, () => void>
) => {
  const key = `${event.metaKey ? 'Meta+' : ''}${event.ctrlKey ? 'Ctrl+' : ''}${
    event.shiftKey ? 'Shift+' : ''
  }${event.altKey ? 'Alt+' : ''}${event.key}`;

  if (handlers[key]) {
    event.preventDefault();
    handlers[key]();
  }
};

// Trap focus within an element (for modals/dialogs)
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  firstElement?.focus();

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};
