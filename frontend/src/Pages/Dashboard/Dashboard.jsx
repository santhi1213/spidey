// import React, { useState, useEffect } from "react";
// import DashBoardGraph1 from "../../components/Graphs/DashboardGraph1";
// import ErrorBoundary from "../../components/ErrorBoundary";

// const Home = ({ isSidebarOpen }) => {
//   const [apiData, setApiData] = useState([]);
//   const [remainingItems, setRemainingItems] = useState([]);
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [totals, setTotals] = useState({
//     idly: 0,
//     dosa: 0,
//     bobbara: 0,
//     pesara: 0,
//   });
//   console.log(totals);
  

//   const AllData = async () => {
//     const response = await fetch("http://localhost:5001/getRemainingItemsWithoutDate")
//     const data = await response.json();
//     if (!response) {
//       alert(response.message)
//     }
//     console.log(data);
//     setRemainingItems(data.remainingItems.reverse());

//     const totals = items.reduce(
//       (acc, item) => ({
//         idly: acc.idly + parseInt(item.idlyBatter || 0),
//         dosa: acc.dosa + parseInt(item.dosaBatter || 0),
//         bobbara: acc.bobbara + parseInt(item.bobbaraBatter || 0),
//         pesara: acc.pesara + parseInt(item.pesaraBatter || 0),
//       }),
//       { idly: 0, dosa: 0, bobbara: 0, pesara: 0 }
//     );
//     setTotals(totals);
//   }
//   useEffect(() => {
//     AllData();
//   }, [])


//   const AllUsers = async () => {
//     try {
//       const response = await fetch('http://localhost:5001/users');
//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }

//       const data = await response.json();
//       setApiData(data.reverse());
//     } catch (err) {
//       console.log(err.message);
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     AllUsers();
//   }, []);


//   return (
//     <div className={`${isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
//       } transition-all`}>
//       <div>
//         {/* Graphs */}
//         <div>
//           <div>
//             <div className="border border-gray-300 p-2 rounded-md w-[100%]">
//               <ErrorBoundary>
//                 <div className="h-34">
//                   <DashBoardGraph1 graphData={remainingItems[0] || {}} />
//                 </div>
//               </ErrorBoundary>
//             </div>
//           </div>
//         </div>

//         {/* Tables (if needed) */}
//         <div>
//           <div>
//             <div>
//               <label htmlFor="date">Date</label>
//               <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//             </div>
//             <table className="w-full border">
//               <thead className="bg-gray-300">
//                 <tr>
//                   <th>SlNo</th>
//                   <th>Client Name</th>
//                   <th>Date</th>
//                   <th>Idly Batter</th>
//                   <th>Dosa Batter</th>
//                   <th>Bobbara Batter</th>
//                   <th>Pesara Batter</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {remainingItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{item.clientName}</td>
//                     <td>{item.date}</td>
//                     <td>{item.idlyBatter}</td>
//                     <td>{item.dosaBatter}</td>
//                     <td>{item.bobbaraBatter}</td>
//                     <td>{item.pesaraBatter}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div>{/* Table 2 */}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import DashBoardGraph1 from "../../components/Graphs/DashboardGraph1";
import ErrorBoundary from "../../components/ErrorBoundary";

const Home = ({ isSidebarOpen }) => {
  const [apiData, setApiData] = useState([]);
  const [remainingItems, setRemainingItems] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [totals, setTotals] = useState({
    idly: 0,
    dosa: 0,
    bobbara: 0,
    pesara: 0,
  });

  const AllData = async () => {
    try {
      const response = await fetch("https://spidey-api-mu.vercel.app/getRemainingItemsWithoutDate");
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error fetching data");
        return;
      }
      console.log(data);
      const items = data.remainingItems.reverse();
      setRemainingItems(items);

      // Calculate totals
      const totals = items.reduce(
        (acc, item) => ({
          idly: acc.idly + parseInt(item.idlyBatter || 0),
          dosa: acc.dosa + parseInt(item.dosaBatter || 0),
          bobbara: acc.bobbara + parseInt(item.bobbaraBatter || 0),
          pesara: acc.pesara + parseInt(item.pesaraBatter || 0),
        }),
        { idly: 0, dosa: 0, bobbara: 0, pesara: 0 }
      );
      setTotals(totals);
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    AllData();
  }, []);

  const AllUsers = async () => {
    try {
      const response = await fetch("https://spidey-api-mu.vercel.app/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setApiData(data.reverse());
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  useEffect(() => {
    AllUsers();
  }, []);

  return (
    <div
      className={`${
        isSidebarOpen ? "ml-16 w-[96%]" : "ml-64 w-[83%]"
      } transition-all border rounded-lg bg-white h-[650px] p-4 shadow-xl  overflow-y-auto`}
    >
      <div>
        {/* Graphs */}
        <div className="mb-6">
          <div className="border border-gray-300 text-center p-4 rounded-md w-full mx-auto">
            <ErrorBoundary>
              <h1 className="text-center text-lg font-semibold mb-4">Items Distribution</h1>
              <div className="w-full h-70">
                <DashBoardGraph1 graphData={totals || {}} />
              </div>
            </ErrorBoundary>
          </div>
        </div>

        {/* Tables */}
        <div className="mb-6">
          <div className="w-full  mx-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-300">
                <tr>
                  <th>SlNo</th>
                  <th>Client Name</th>
                  <th>Date</th>
                  <th>Idly Batter</th>
                  <th>Dosa Batter</th>
                  <th>Bobbara Batter</th>
                  <th>Pesara Batter</th>
                  <th>Total Items</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {remainingItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="uppercase">{item.clientName}</td>
                    <td>{item.date}</td>
                    <td>{item.idlyBatter}</td>
                    <td>{item.dosaBatter}</td>
                    <td>{item.bobbaraBatter}</td>
                    <td>{item.pesaraBatter}</td>
                    <td>{Number(item.idlyBatter) + Number(item.dosaBatter) +
                                    Number(item.bobbaraBatter) + Number(item.pesaraBatter)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
