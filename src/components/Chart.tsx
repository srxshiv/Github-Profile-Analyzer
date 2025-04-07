import { useEffect ,useState } from "react";
import CommitChart from "./CommitChart";
import getAllCommits from "../lib/getAllCommits";

export default function Chart({username , repos} : {username: string , repos: any[]}) {

    const [chartData , setChartData] = useState<{date: string , commits : number}[]>([])
    const [days , setDays] = useState<number>(7)
    const [loading , setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchData() {
          setLoading(true);
          try {
            const data = await getAllCommits(username, days, repos);
            setChartData(data);
          } catch (err) {
            console.error("Failed to fetch commits:", err);
          } finally {
            setLoading(false);
          }
        }
    
        fetchData();
      }, [username, repos, days]);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <select  onChange={(e)=>setDays(parseInt(e.target.value))}>
          <option value="7">7 Days</option>
          <option value="30">1 Month</option>
          <option value="90">3 Months</option>
          <option value="180">6 Months</option>
          <option value="365">1 Year</option>
          <option value="1820">5 Years</option>
        </select>
         <div>
          days:
         <input
          type="string"
          placeholder="Days Since"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="border border-gray-300 rounded-md px-3 py-2 w-24 text-right"
        />
         </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading chart...</div>
      ) : (
        <CommitChart data={chartData} />
      )}
    </div>
  );
}


  
