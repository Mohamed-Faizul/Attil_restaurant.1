"use client";

import { useEffect, useRef, useState } from "react";

export default function QRScanner({ category, onDetected, onClose }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState("Point your camera at a cuisine QR code.");

  useEffect(() => {
    let timer;
    let detector;
    let active = true;

    const stop = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (timer) window.clearInterval(timer);
    };

    const start = async () => {
      if (!("BarcodeDetector" in window) || !navigator.mediaDevices?.getUserMedia) {
        setStatus("QR camera scanning is not supported in this browser. Use the category card instead.");
        return;
      }
      try {
        detector = new window.BarcodeDetector({ formats: ["qr_code"] });
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!active || !videoRef.current) return;
        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();
        timer = window.setInterval(async () => {
          if (!videoRef.current || videoRef.current.readyState < 2) return;
          const codes = await detector.detect(videoRef.current);
          const value = codes[0]?.rawValue || "";
          const scannedCategory = new URL(value, window.location.origin).searchParams.get("category");
          if (scannedCategory) {
            onDetected(scannedCategory);
            stop();
          }
        }, 450);
      } catch {
        setStatus("Camera access was not available. Please allow camera access and try again.");
      }
    };

    start();
    return () => { active = false; stop(); };
  }, [onDetected]);

  return <div className="menu-qr-backdrop" role="presentation" onClick={onClose}>
    <div className="menu-qr-dialog" role="dialog" aria-modal="true" aria-label={`Scan ${category.name} QR code`} onClick={(event) => event.stopPropagation()}>
      <button className="menu-qr-close" type="button" onClick={onClose} aria-label="Close scanner">×</button>
      <p className="eyebrow">SCAN TO OPEN</p>
      <h2>{category.name}</h2>
      <div className="menu-qr-frame"><video ref={videoRef} muted playsInline /><span /></div>
      <p>{status}</p>
    </div>
  </div>;
}