import axios from "axios";

async function getAllCommits(username: string, days: number = 7, repos: any[]) {
  const now = new Date();
  const since = new Date();
  since.setDate(now.getDate() - days);

  const dailyCommits: Record<string, number> = {};

  for (const repo of repos) {
    try {
      const commitsRes = await axios.get(
        `https://api.github.com/repos/${username}/${repo.name}/commits`,
        {
          params: {
            since: since.toISOString(),
            until: now.toISOString(),
          },
        }
      );

      commitsRes.data.forEach((commit: any) => {
        const date = commit.commit.author.date.split("T")[0];
        if (dailyCommits[date]) {
          dailyCommits[date] = dailyCommits[date] + 1;
        } else {
          dailyCommits[date] = 1;
        }
      });
    } catch (err) {
      continue;
    }
  }

  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (!dailyCommits[key]) dailyCommits[key] = 0;
  }

  const chartData = Object.entries(dailyCommits)
    .map(([date, commits]) => ({ date, commits }))
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  return chartData;
}

export default getAllCommits;
