import React, { useEffect, useState } from "react";
import { getAccessToken, getAssetListCount } from "../Api";
import clients from "../Utils/clients";
import timeFilter from "../Utils/timeFilter";
import moment from "moment";
function MaintananceCount() {
  const [assetListCounts, setAssetListCounts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const expirationTime = localStorage.getItem("expirationTime");
      let token = localStorage.getItem("accessToken");
      if (expirationTime < moment().clone().subtract(5, "minutes").valueOf()) {
        console.log("calling token api");
        token = await getAccessToken();
      }
      const results = await Promise.all(
        clients.map(async (client) => {
          console.log(client);

          const assetData = await getAssetListCount(
            token,
            client.searchLabel,
            client.clientDomain,
            timeFilter
          );
          console.log(assetData.result.lessCommunicating);
          return { client: client.clientDomain, data: assetData.result };
        })
      );
      setAssetListCounts(results);
    };

    fetchData();
  }, []);

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
              {assetListCounts.map((clientData) => (
                <tr key={clientData.client}>
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

export default MaintananceCount;
