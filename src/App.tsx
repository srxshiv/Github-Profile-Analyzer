import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Chart from "./components/Chart";
import { Card } from "./components/ui/card";


function App() {
  const [username, setUsername] = useState<string>("");
  const [repos, setRepos] = useState<any[]>([]);
  const [repositories, setRepositories] = useState<boolean>(true);

  const handleSearch = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepos(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsername("");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 py-16">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Github Analyzer
          </h1>
          <p className="text-gray-600">
            Search and analyze GitHub repositories
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto mb-12">
          <Input
            placeholder="Enter GitHub Username"
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg "
          />
          <Button
            onClick={() => handleSearch()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Search
          </Button>
        </div>

        <div className="flex justify-center mb-4">
          <Button className="m-2 bg-blue-500 hover:bg-blue-700 transition-all duration-200" onClick={()=>setRepositories(true)}>Repositories</Button>
          <Button className="m-2 bg-transparent text-black border-2 border-black hover:bg-gray-300 transition-all duration-200" 
          onClick={() => setRepositories(false)}
          >Contributions</Button>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <h1 className="p-4 text-3xl">{repos.length>0 ? (repos[0].full_name.split('/')[0]) : ("") }</h1>
          {repositories ? (
            repos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {repos.map((repo, index) => (
                  <Card
                    key={index}
                    className="flex flex-col justify-between p-5 h-64 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white overflow-hidden"
                  >
                    <div className="space-y-3 overflow-hidden">
                      <h2
                        className="w-full text-lg text-center font-semibold text-gray-800 border-b-2 border-blue-950 truncate"
                        title={repo.name}
                      >
                        {repo.name}
                      </h2>
                    </div>
                    <div className=" text-gray-600 ">
                        <p className="line-clamp-2" title={repo.description}>
                          {repo.description}
                        </p>
                      </div>

                    <div>
                      <div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                          <span className="flex items-center font-semibold text-[12px]">
                            Forks: {repo.forks}
                          </span>
                          <span className="flex items-center font-semibold text-[12px]">
                            Size: {repo.size} KB
                          </span>
                          <span className="flex items-center font-semibold text-[12px]">
                            Issues: {repo.open_issues}
                          </span>
                        </div>
                      </div>
                    <Button
                      onClick={() => window.open(repo.html_url)}
                      className="mt-4 w-full py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      View Repository
                    </Button>
                    </div>
                  </Card>
                ))}
              </div>

            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No repositories found</p>
                <p className="text-gray-400 mt-1">
                  Try searching for a GitHub username
                </p>
              </div>
            )
          ) : (
            <Chart username={username} repos={repos} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
