'use client';

import { formatPrice } from '@/lib/utils';
import { cartSubtotal, useCart } from '@/store/cart';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.email('Enter a valid email'),
  address: z.string().min(6, 'Enter a street address'),
  city: z.string().min(2, 'Enter a city'),
  postal: z.string().min(4, 'Enter a postal code'),
  card: z.string().min(12, 'Enter a card number'),
});

type FormValues = z.infer<typeof schema>;

export default function Checkout() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = cartSubtotal(items);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      postal: '',
      card: '',
    },
  });

  if (items.length === 0) {
    return (
      <div>
        <h1 className="font-display text-4xl">Checkout</h1>
        <p className="mt-4 text-muted">Your bag is empty.</p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 font-medium text-primary-fg transition-colors hover:bg-ok"
        >
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-4xl">Checkout</h1>
      <form
        className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]"
        onSubmit={form.handleSubmit(() => {
            clear();
          router.push('/checkout/success');
        })}
      >
        <div className="space-y-4">
          {(
            [
              ['name', 'Full name'],
              ['email', 'Email'],
              ['address', 'Street address'],
              ['city', 'City'],
              ['postal', 'Postal code'],
              ['card', 'Card number'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block">
              <span className="mb-1.5 block text-sm text-muted">{label}</span>
              <Input {...form.register(key)} autoComplete={key} />
              {form.formState.errors[key] && (
                <span className="mt-1 block text-xs text-danger">
                  {form.formState.errors[key]?.message}
                </span>
              )}
            </label>
          ))}
        </div>
        <aside className="h-fit rounded-xl bg-surface p-5 shadow-(--shadow-border)">
          <p className="text-sm text-muted">{items.length} line items</p>
          <p className="mt-2 font-display text-3xl tabular-nums">
            {formatPrice(subtotal)}
          </p>
          <Button type="submit" className="mt-6 w-full">
            Place order
          </Button>
        </aside>
      </form>
    </div>
  );
}
