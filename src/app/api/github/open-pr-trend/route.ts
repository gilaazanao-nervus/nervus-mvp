import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PullRequest = {
  created_at: string;
  closed_at: string | null;
};

type TrendPoint = {
  label: string;
  openPr: number;
};

const GITHUB_API_BASE = "https://api.github.com";
const PER_PAGE = 100;
const WEEK_COUNT = 8;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const getWeekEnds = () => {
  const now = new Date();
  const endOfTodayUtc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999)
  );

  return Array.from({ length: WEEK_COUNT }, (_, index) => {
    const offsetWeeks = WEEK_COUNT - 1 - index;
    return new Date(endOfTodayUtc.getTime() - offsetWeeks * WEEK_MS);
  });
};

const formatDateLabel = (date: Date) => date.toISOString().slice(0, 10);

const isOpenAtWeekEnd = (pull: PullRequest, weekEnd: Date) => {
  const createdAt = new Date(pull.created_at);
  const closedAt = pull.closed_at ? new Date(pull.closed_at) : null;
  return createdAt <= weekEnd && (!closedAt || closedAt > weekEnd);
};

const fetchAllPullRequests = async (
  owner: string,
  repo: string,
  token: string
): Promise<PullRequest[]> => {
  const pulls: PullRequest[] = [];
  let page = 1;

  while (true) {
    const url = new URL(`${GITHUB_API_BASE}/repos/${owner}/${repo}/pulls`);
    url.searchParams.set("state", "all");
    url.searchParams.set("per_page", PER_PAGE.toString());
    url.searchParams.set("page", page.toString());

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API error: ${response.status} ${errorText}`);
    }

    const data = (await response.json()) as PullRequest[];
    pulls.push(...data);

    if (data.length < PER_PAGE) {
      break;
    }

    page += 1;
  }

  return pulls;
};

export async function GET() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    return NextResponse.json(
      { error: "Missing GITHUB_OWNER, GITHUB_REPO, or GITHUB_TOKEN" },
      { status: 500 }
    );
  }

  try {
    const pulls = await fetchAllPullRequests(owner, repo, token);
    const weekEnds = getWeekEnds();

    const periods: TrendPoint[] = weekEnds.map((weekEnd) => {
      const openPr = pulls.filter((pull) => isOpenAtWeekEnd(pull, weekEnd)).length;
      return {
        label: formatDateLabel(weekEnd),
        openPr
      };
    });

    return NextResponse.json({ periods });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
