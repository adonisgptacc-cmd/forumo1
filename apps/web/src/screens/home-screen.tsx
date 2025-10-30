import { Link } from 'react-router-dom';
import { showToast } from '../lib/toast.ts';

const featureList = [
  'Escrow-first marketplace infrastructure',
  'Seller KYC and compliance workflows',
  'Offer-based negotiation without carts',
  'Dispute management with built-in messaging',
];

export function HomeScreen() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-20">
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Build trust-first marketplaces with Forumo
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Forumo stitches together escrow, KYC, messaging, and moderation so you can launch
          transaction-safe communities faster. This monorepo contains the full stack powering the
          experience.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/40"
            onClick={(event) => {
              event.preventDefault();
              showToast('Documentation is coming soon!', 'info');
            }}
          >
            Explore docs
          </Link>
          <a
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500"
            href="https://github.com/forumo"
            target="_blank"
            rel="noreferrer"
          >
            View GitHub
          </a>
        </div>
      </div>
      <div className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-xl shadow-black/40 sm:grid-cols-2">
        {featureList.map((feature) => (
          <div key={feature} className="flex items-start gap-4">
            <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand">
              ✓
            </span>
            <p className="text-left text-base text-slate-200">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
