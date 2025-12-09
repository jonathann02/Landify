import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function LandingPage() {
  return (
    <div className="flex flex-1 flex-col gap-16 py-8 lg:flex-row lg:items-center">
      {/* Hero */}
      <section className="flex-1 space-y-6">
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Build landing pages without touching WordPress.
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
          Launch focused landing pages
          <span className="block text-indigo-400">
            in minutes, not weeks.
          </span>
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
          Landify lets non-technical teams build campaign-ready landing pages
          from reusable sections. No themes to break, no plugins to update – just
          clean, fast pages for your ads and social traffic.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/register">
            <Button>Get started for free</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost">Log in</Button>
          </Link>
          <p className="text-xs text-slate-400">
            No credit card required. Just create a page and share the link.
          </p>
        </div>

        <dl className="mt-6 grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-slate-100">Non-technical users</dt>
            <dd>Designed for small businesses, creators and internal teams.</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-100">Section-based builder</dt>
            <dd>Hero, services, testimonials, contact and more.</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-100">Shareable URLs</dt>
            <dd>Publish to a clean URL you can use in ads and bios.</dd>
          </div>
        </dl>
      </section>

      {/* “Preview”-kort */}
      <section className="flex-1">
        <div className="relative mx-auto max-w-md rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-xl shadow-indigo-500/10">
          <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
            <span>Preview</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live
            </span>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-950/70 p-4">
            <div className="space-y-2">
              <div className="h-2 w-20 rounded-full bg-indigo-500/70" />
              <div className="h-7 w-40 rounded-full bg-slate-700" />
              <div className="h-3 w-56 rounded-full bg-slate-800" />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="h-20 rounded-xl bg-slate-900/80" />
              <div className="h-20 rounded-xl bg-slate-900/80" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-8 flex-1 rounded-full bg-indigo-500/80" />
              <div className="h-8 flex-1 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          The landing page builder preview. In the final product, this will show
          your sections as you edit them.
        </p>
      </section>
    </div>
  );
}
