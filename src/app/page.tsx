import Link from "next/link";

export default function Home() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10">
      <h2 className="text-2xl font-semibold">Welcome to Nervus</h2>
      <p className="mt-3 text-slate-300">
        Head to the team dashboard to see activity signals and employee insights.
      </p>
      <Link
        className="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        href="/team"
      >
        View team dashboard
      </Link>
    </div>
  );
}
