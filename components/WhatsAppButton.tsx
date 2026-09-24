import { restaurant } from "@/data/restaurant";

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp"
      href={`https://wa.me/91${restaurant.phone}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.2a12.7 12.7 0 0 0-10.8 19.4L3.4 28.8l6.4-1.7A12.8 12.8 0 1 0 16 3.2Z" />
        <path d="M12.1 9.8c.3-.3.6-.3.9-.1l1.6 2.4c.2.3.2.6 0 .9l-.7.8c.7 1.4 1.8 2.5 3.2 3.2l.8-.7c.3-.2.6-.2.9 0l2.4 1.6c.3.2.3.6.1.9l-.6.7c-.5.6-1.3.9-2 .7-4.5-1.2-7.8-4.5-9-9-.2-.7.1-1.5.7-2l.7-.6Z" />
      </svg>
    </a>
  );
}
