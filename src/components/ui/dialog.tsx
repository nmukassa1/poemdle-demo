"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Dialog({
  open,
  onClose,
  labelledBy,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    if (!dialog.open) dialog.showModal();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onCloseRef.current();
    };

    dialog.addEventListener("keydown", onKeyDown);

    return () => {
      dialog.removeEventListener("keydown", onKeyDown);
      if (dialog.open) dialog.close();
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="dialog-panel"
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
