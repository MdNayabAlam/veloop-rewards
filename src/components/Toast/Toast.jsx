import React from "react";
import { useGiveaway } from "../../context/GiveawayContext";
import { CheckCircle2, AlertCircle, Info, Sparkles } from "lucide-react";
import "./Toast.css";

export default function Toast() {
  const { toast } = useGiveaway();

  if (!toast) return null;

  return (
    <div className={`veloop-toast ${toast.type}`}>
      <div className="toast-icon">
        {toast.type === "success" && <CheckCircle2 size={18} />}
        {toast.type === "error" && <AlertCircle size={18} />}
        {toast.type === "info" && <Info size={18} />}
      </div>
      <span className="toast-text">{toast.message}</span>
    </div>
  );
}
