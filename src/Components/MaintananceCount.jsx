import React, { useEffect, useState } from "react";
import { getAccessToken, getAssetListCount } from "../Api";
import clientsEnv from "../Utils/clientsEnv";
import timeFilter from "../Utils/timeFilter";
import moment from "moment";

function MaintenanceCount() {
  const [assetListCounts, setAssetListCounts] = useState([]);
  const [fetchingClient, setFetchingClient] = useState(null);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    console.log("calling useEffect ");
    fetchData();
  }, []);

  const fetchData = async () => {
    for (const env of clientsEnv) {
    let localToken = localStorage.getItem("accessToken");

    if (
      !localToken
    ) {
      console.log("Calling token API");
      localToken = await getAccessToken(env.graphqlURL,env.username,env.password);
    }
      const clients = env.clients;
      for (const client of clients) {
        console.log(
          `<----------------------started fetching list ${client.clientDomain} in ${env.name}------------------------------------------------>`
        );
        setFetchingClient(client.clientDomain);
        await delay(5000); // Simulate delay for fetching data
        const assetData = await getAssetListCount(
          env.graphqlURL,
          localToken,
          client.searchLabel,
          client.clientDomain,
          timeFilter
        );
        console.log(assetData)
        console.log(
          `<----------------------completed fetching list ${client.clientDomain} in ${env.name}------------------------------------------------>`
        );
        setAssetListCounts((prevCounts) => [
          ...prevCounts,
          { client: client.clientDomain, data: assetData.result, env: env.name },
        ]);
        setFetchingClient(null);
      }
      localStorage.removeItem("accessToken");
    }
  };

  return (
    <div className="container mt-5">
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <h1 className="text-center mb-4">Asset List Count</h1>
      <div className="table-responsive">
        {assetListCounts.length > 0 ? (
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th className="text-center">Environment</th>
                <th className="text-center">Client Name</th>
                <th className="text-center bg-primary text-white">
                  Total Connected Assets
                </th>
                <th className="text-center bg-success text-white">
                  Frequently Communicating
                </th>
                <th className="text-center bg-warning">Less Communicating</th>
                <th className="text-center bg-danger text-white">
                  Non Communicating
                </th>
                <th className="text-center bg-secondary text-white">
                  Not Connected
                </th>
              </tr>
            </thead>
            <tbody>
              {assetListCounts.map((clientData, index) => (
                <tr key={index}>
                  <td className="text-center font-weight-bold">
                    {clientData.env} {/* Show environment name */}
                  </td>
                  <td className="text-center font-weight-bold">
                    {clientData.client}
                  </td>
                  <td className="text-center">
                    {clientData.data.total - clientData.data.notConnected || 0}
                  </td>
                  <td className="text-center">
                    {clientData.data.frequentlyCommunicating || 0}
                  </td>
                  <td className="text-center">
                    {clientData.data.lessCommunicating || 0}
                  </td>
                  <td className="text-center">
                    {clientData.data.notCommunicating || 0}
                  </td>
                  <td className="text-center">
                    {clientData.data.notConnected || 0}
                  </td>
                </tr>
              ))}
              {fetchingClient && (
                <tr>
                  <td colSpan="7" className="text-center mt-3">
                    Fetching data for {fetchingClient}...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
}

export default MaintenanceCount;
