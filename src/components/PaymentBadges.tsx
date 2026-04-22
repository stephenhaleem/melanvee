type Props = { className?: string };

const methods = ["Apple Pay", "Google Pay", "Klarna", "PayPal", "Mastercard", "Visa"];

export function PaymentBadges({ className = "" }: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {methods.map((m) => (
        <span
          key={m}
          className="text-[10px] uppercase tracking-wider border border-border bg-card text-mauve px-3 py-1.5"
        >
          {m}
        </span>
      ))}
    </div>
  );
}
