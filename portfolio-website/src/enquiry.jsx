import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function EnquiryForm() {
  const [status, setStatus] = useState(null); // "ok" | "error" | null

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name")?.toString().trim(),
      email: fd.get("email")?.toString().trim(),
      phone: fd.get("phone")?.toString().trim(),
      message: fd.get("message")?.toString().slice(0, 10000),
      // honeypot:
      website: fd.get("website")?.toString().trim(),
    };

    if (payload.website) return; // bot trap
    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("https://your-vercel-project.vercel.app/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("ok");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div style={{maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "ui-sans-serif, system-ui"}}>
      <h1 style={{fontSize: 28, fontWeight: 800, marginBottom: 8}}>Enquiry</h1>
      <p style={{marginBottom: 24}}>Send a message and it will be saved to my GitHub inbox folder.</p>

      <form onSubmit={onSubmit} style={{display: "grid", gap: 12}}>
        <input name="website" autoComplete="off" style={{display:"none"}} />
        <input name="name" placeholder="Your name *" required
               style={{padding:12, borderRadius:12, border:"1px solid #e5e7eb"}} />
        <input name="email" type="email" placeholder="Email *" required
               style={{padding:12, borderRadius:12, border:"1px solid #e5e7eb"}} />
        <input name="phone" placeholder="Phone (optional)"
               style={{padding:12, borderRadius:12, border:"1px solid #e5e7eb"}} />
        <textarea name="message" placeholder="Your message (max 10,000 chars) *" required
                  maxLength={10000} rows={10}
                  style={{padding:12, borderRadius:12, border:"1px solid #e5e7eb"}} />
        <button type="submit"
                style={{padding:"12px 16px", borderRadius:12, border:"1px solid #3b82f6", color:"#3b82f6"}}>
          Submit
        </button>
      </form>

      {status === "ok" && (
        <p style={{marginTop:12, color:"#16a34a"}}>Thanks! Saved successfully.</p>
      )}
      {status === "error" && (
        <p style={{marginTop:12, color:"#ef4444"}}>Oops—please try again.</p>
      )}

      <p style={{marginTop:24}}>
        ← <a href={`${import.meta.env.BASE_URL}`} style={{color:"#3b82f6"}}>Back to portfolio</a>
      </p>
    </div>
  );
}

createRoot(document.getElementById("app")).render(<EnquiryForm />);
