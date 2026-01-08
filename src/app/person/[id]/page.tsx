import Link from "next/link";
import LineChart from "@/components/LineChart";
import { people } from "@/mock/data";

type PersonPageProps = {
  params: { id: string };
};

export default function PersonPage({ params }: PersonPageProps) {
  const person = people.find((entry) => entry.id === params.id);

  if (!person) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
        <p className="text-lg font-semibold">Person not found</p>
        <Link className="mt-4 inline-flex text-sm text-cyan-300" href="/team">
          ← Back to team dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Link className="text-sm text-cyan-300 hover:text-cyan-200" href="/team">
          ← Back to team dashboard
        </Link>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Employee view</p>
          <h2 className="mt-2 text-2xl font-semibold">{person.name}</h2>
          <p className="mt-2 text-sm text-slate-300">
            Baseline target: <span className="font-semibold text-slate-100">{person.baseline} WIP</span>
          </p>
        </div>
      </div>

      <LineChart
        title="Personal work signals"
        data={person.personalSeries}
        showBaseline
        baselineValue={person.baseline}
      />

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p className="font-semibold text-slate-100">Baseline context</p>
        <p className="mt-2">
          The baseline line represents {person.baseline} units of typical WIP for {person.name}. Use it as a
          reference to understand whether current activity is running hot or cool.
        </p>
      </div>
    </div>
  );
}
