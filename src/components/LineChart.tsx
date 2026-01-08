import type { PeriodPoint } from "@/mock/data";

const colors = {
  jira: "#38bdf8",
  github: "#a855f7",
  baseline: "#fbbf24"
};

type LineChartProps = {
  title: string;
  data: PeriodPoint[];
  showBaseline?: boolean;
  baselineValue?: number;
};

const padding = 24;
const height = 220;
const width = 640;

const toPoints = (values: number[], min: number, max: number) =>
  values.map((value, index) => {
    const x = padding + (index / (values.length - 1)) * (width - padding * 2);
    const range = max - min || 1;
    const y = padding + (1 - (value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

export default function LineChart({ title, data, showBaseline, baselineValue }: LineChartProps) {
  const labels = data.map((point) => point.label);
  const jiraValues = data.map((point) => point.jiraWip);
  const githubValues = data.map((point) => point.githubOpenPr);
  const baselineValues = showBaseline && baselineValue !== undefined ? [baselineValue] : [];
  const min = Math.min(...jiraValues, ...githubValues, ...baselineValues);
  const max = Math.max(...jiraValues, ...githubValues, ...baselineValues);
  const jiraPoints = toPoints(jiraValues, min, max).join(" ");
  const githubPoints = toPoints(githubValues, min, max).join(" ");

  const baselinePoints =
    showBaseline && baselineValue !== undefined
      ? toPoints(Array(data.length).fill(baselineValue), min, max).join(" ")
      : null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.jira }} />
            Jira WIP
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.github }} />
            GitHub Open PRs
          </span>
          {showBaseline ? (
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.baseline }} />
              Baseline
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-6">
        <svg className="w-full" viewBox={`0 0 ${width} ${height}`}>
          <rect x="0" y="0" width={width} height={height} rx="16" fill="#0f172a" />
          <polyline
            points={jiraPoints}
            fill="none"
            stroke={colors.jira}
            strokeWidth="3"
          />
          <polyline
            points={githubPoints}
            fill="none"
            stroke={colors.github}
            strokeWidth="3"
          />
          {baselinePoints ? (
            <polyline
              points={baselinePoints}
              fill="none"
              stroke={colors.baseline}
              strokeDasharray="6 4"
              strokeWidth="2"
            />
          ) : null}
        </svg>
        <div className="mt-4 flex justify-between text-xs text-slate-400">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
