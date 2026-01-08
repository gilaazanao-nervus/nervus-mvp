"use client";

import Link from "next/link";
import { useState } from "react";
import LineChart from "@/components/LineChart";
import { people, periods } from "@/mock/data";

const insight = {
  what: "Work in progress spiked in Week 4 while open pull requests dipped.",
  why: "That pattern usually signals that engineers are starting work but not shipping at the same pace.",
  action: "Schedule a mid-sprint review to unblock reviews and clarify delivery targets."
};

export default function TeamPage() {
  const [reviewed, setReviewed] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Team dashboard</p>
          <h2 className="mt-2 text-2xl font-semibold">Engineering activity</h2>
        </div>
        <button
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            reviewed
              ? "bg-emerald-400 text-slate-950"
              : "border border-slate-700 bg-slate-900/60 text-slate-100 hover:border-cyan-400"
          }`}
          type="button"
          onClick={() => setReviewed((current) => !current)}
        >
          {reviewed ? "Reviewed" : "Mark as reviewed"}
        </button>
      </section>

      <LineChart title="Team throughput signals" data={periods} />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold">AI Insight</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">What we see</p>
              <p className="mt-2">{insight.what}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Why it matters</p>
              <p className="mt-2">{insight.why}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-400">Recommended action</p>
              <p className="mt-2">{insight.action}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold">People</h3>
          <div className="mt-4 space-y-4">
            {people.map((person) => (
              <div
                key={person.id}
                className="flex flex-col gap-3 rounded-xl border border-slate-800/70 bg-slate-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold">{person.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{person.personalSeries[4]?.label} snapshot</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      person.status === "Above baseline"
                        ? "bg-amber-300/20 text-amber-200"
                        : "bg-emerald-300/20 text-emerald-200"
                    }`}
                  >
                    {person.status}
                  </span>
                  <Link
                    className="text-xs font-semibold text-cyan-300 hover:text-cyan-200"
                    href={`/person/${person.id}`}
                  >
                    View profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
