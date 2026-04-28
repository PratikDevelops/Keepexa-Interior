// src/components/WhatsAppButton.tsx

export default function WhatsAppButton() {
  const phoneNumber = "+917371073711"; // Replace with your number (include country code)
  const message = "Hello! I have a question about your products.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      aria-label="Contact us on WhatsApp"
    >
      {/* Official WhatsApp logo SVG — no external dependency */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.773L0 32l8.418-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.538a13.51 13.51 0 0 1-6.9-1.892l-.494-.294-5.124 1.22 1.244-4.994-.32-.512A13.476 13.476 0 0 1 2.462 16C2.462 8.52 8.52 2.462 16 2.462S29.538 8.52 29.538 16 23.48 29.538 16 29.538zm7.406-10.116c-.406-.203-2.4-1.184-2.772-1.319-.372-.135-.643-.203-.913.203s-1.048 1.319-1.285 1.59c-.237.27-.474.304-.88.101-.406-.203-1.714-.632-3.266-2.015-1.207-1.077-2.022-2.407-2.259-2.813-.237-.406-.025-.625.178-.827.183-.182.406-.474.61-.711.202-.237.27-.406.405-.677.136-.27.068-.507-.034-.711-.101-.203-.913-2.201-1.25-3.013-.33-.792-.664-.685-.913-.697l-.778-.013c-.27 0-.711.101-1.083.507-.372.406-1.42 1.387-1.42 3.385s1.454 3.927 1.657 4.198c.203.27 2.862 4.37 6.933 6.126.969.418 1.724.668 2.313.855.972.309 1.857.265 2.557.161.78-.116 2.4-.98 2.738-1.928.338-.947.338-1.759.237-1.928-.101-.169-.372-.27-.778-.474z" />
      </svg>
    </a>
  );
}