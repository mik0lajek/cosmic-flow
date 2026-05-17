"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/utils/donation-modal.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface Props {
  isOpen:    boolean;
  onClose:   () => void;
  onSuccess: () => void;
}

export default function DonationModal({ isOpen, onClose, onSuccess }: Props) {
  const [mounted,    setMounted]    = useState(false);
  const [name,       setName]       = useState("");
  const [amount,     setAmount]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [succeeded,  setSucceeded]  = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!isOpen) return;
    setName("");
    setAmount("");
    setError(null);
    setSucceeded(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!succeeded) return;
    const timer = setTimeout(onClose, 1800);
    return () => clearTimeout(timer);
  }, [succeeded, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsedAmount = parseInt(amount, 10);
    if (!name.trim()) { setError("Name is required."); return; }
    if (!parsedAmount || parsedAmount < 1) { setError("Enter a valid amount."); return; }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/support`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name: name.trim(), amount: parsedAmount }),
      });
      if (!res.ok) throw new Error("Server error");
      setSucceeded(true);
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-panel" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {succeeded ? (
          <div className="modal-success">
            <span className="modal-success__icon">✦</span>
            <h2 className="modal-success__title">Thank you!</h2>
            <p className="modal-success__body">
              Your contribution brings humanity one step closer to Mars.
              The mission continues.
            </p>
            <button className="modal-success__close" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <span className="modal-kicker">Cosmic Flow · Mars Initiative</span>
            <h2 className="modal-title">Support the<br />Mission</h2>
            <p className="modal-subtitle">
              Join {(482_100).toLocaleString("en-US")}+ supporters funding humanity's next chapter.
            </p>

            <div className="modal-field">
              <label className="modal-label" htmlFor="donor-name">Your Name</label>
              <input
                id="donor-name"
                className="modal-input"
                type="text"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={submitting}
                autoComplete="name"
                maxLength={120}
              />
            </div>

            <div className="modal-field">
              <label className="modal-label" htmlFor="donor-amount">Donation Amount (USD)</label>
              <div className="modal-amount-wrap">
                <span className="modal-amount-prefix">$</span>
                <input
                  id="donor-amount"
                  className="modal-input"
                  type="number"
                  placeholder="100"
                  min="1"
                  max="1000000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>

            {error && <p className="modal-error">{error}</p>}

            <button className="modal-submit" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Support the Mission"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
