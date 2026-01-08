export type PeriodPoint = {
  label: string;
  jiraWip: number;
  githubOpenPr: number;
};

export type PersonSeriesPoint = PeriodPoint;

export type Person = {
  id: string;
  name: string;
  status: "Normal" | "Above baseline";
  personalSeries: PersonSeriesPoint[];
  baseline: number;
};

export const periods: PeriodPoint[] = [
  { label: "Week 1", jiraWip: 18, githubOpenPr: 6 },
  { label: "Week 2", jiraWip: 22, githubOpenPr: 9 },
  { label: "Week 3", jiraWip: 15, githubOpenPr: 11 },
  { label: "Week 4", jiraWip: 26, githubOpenPr: 7 },
  { label: "Week 5", jiraWip: 21, githubOpenPr: 10 }
];

export const people: Person[] = [
  {
    id: "aiden",
    name: "Aiden Park",
    status: "Normal",
    baseline: 15,
    personalSeries: [
      { label: "Week 1", jiraWip: 12, githubOpenPr: 4 },
      { label: "Week 2", jiraWip: 16, githubOpenPr: 6 },
      { label: "Week 3", jiraWip: 13, githubOpenPr: 5 },
      { label: "Week 4", jiraWip: 18, githubOpenPr: 7 },
      { label: "Week 5", jiraWip: 14, githubOpenPr: 6 }
    ]
  },
  {
    id: "mila",
    name: "Mila Chen",
    status: "Above baseline",
    baseline: 14,
    personalSeries: [
      { label: "Week 1", jiraWip: 18, githubOpenPr: 6 },
      { label: "Week 2", jiraWip: 21, githubOpenPr: 9 },
      { label: "Week 3", jiraWip: 20, githubOpenPr: 8 },
      { label: "Week 4", jiraWip: 23, githubOpenPr: 10 },
      { label: "Week 5", jiraWip: 19, githubOpenPr: 9 }
    ]
  },
  {
    id: "river",
    name: "River Okafor",
    status: "Normal",
    baseline: 13,
    personalSeries: [
      { label: "Week 1", jiraWip: 10, githubOpenPr: 5 },
      { label: "Week 2", jiraWip: 14, githubOpenPr: 6 },
      { label: "Week 3", jiraWip: 12, githubOpenPr: 4 },
      { label: "Week 4", jiraWip: 15, githubOpenPr: 6 },
      { label: "Week 5", jiraWip: 13, githubOpenPr: 5 }
    ]
  }
];
