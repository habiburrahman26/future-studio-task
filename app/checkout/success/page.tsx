import Button from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-subtle">
        Order placed
      </p>
      <h1 className="mt-3 font-display text-4xl">Thank you</h1>
      <p className="mt-4 text-muted">
        This is a demo checkout — no payment was taken. Your bag has been
        cleared.
      </p>
      <Button  className="mt-8">
        <Link href="/">Return to catalog</Link>
      </Button>
    </div>
  );
}
