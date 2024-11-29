import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../../Components/Ui/Loader";

const FlashSaleManagement = () => {
  const [sale, setSale] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [salesList, setSalesList] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFlashSaleStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/api/flash-sale/getFlashSale`
        );
        setLoading(false);
        if (response.data) {
          setSale(response.data);
        }
      } catch (err) {
        // console.log(err);

        setLoading(false);
        setError(
          err.message || "An error occurred while fetching flash sale status."
        );
      }
    };

    const fetchSalesList = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/flash-sale`);
        setSalesList(response.data); // Assuming the API returns the current sale
      } catch (err) {
        console.log(err);

        if (err?.response?.status === 404) {
          // since api return 404 that means there is no sales found in the database so set the state as an empty array
          setSalesList([]);
        } else {
          setError(
            err?.message || "An error occurred while fetching sales list."
          );
        }
      }
    };

    fetchFlashSaleStatus();
    fetchSalesList();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/flash-sale`, {
        start,
        end,
      });
      alert("Flash sale created/updated successfully");
      setStart("");
      setEnd("");
      // Re-fetch sales list to update UI
      const response = await axios.get(`${apiUrl}/api/flash-sale`);
      setSalesList([response.data]);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/flash-sale/${id}`);
      setSalesList(salesList.filter((sale) => sale._id !== id));
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  // if (error) return <div className="text-red-500">{error}</div>;
  if (loading || error) {
    return (
      <Loader
        error={error}
        extraErrorMessage="Error loading flash sale!"
        isBorder={false}
        isLoading={loading}
        loadingText="Falsh sale is loading"
      />
    );
  }
  if (!loading && !error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-5">
          Flash Sale Management
        </h1>

        {/* Flash Sale Status */}
        {salesList ? (
          <div
            className={`p-4 rounded-md ${
              salesList?.status === "ongoing" ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            <h2 className="font-bold">{salesList?.message}</h2>
            <p>
              {salesList?.countdown
                ? `Ends in: ${salesList?.ends_in}`
                : "No countdown available."}
            </p>
          </div>
        ) : (
          <div className="text-center">No Flash sale found!</div>
        )}

        {/* Create/Update Flash Sale Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <h2 className="font-bold mb-2">Create/Update Flash Sale</h2>
          <label>
            Start:
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="block border rounded-md p-1 mb-2 w-full"
              required
            />
          </label>
          <label>
            End:
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="block border rounded-md p-1 mb-2 w-full"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </form>

        {/* Existing Flash Sales List */}

        {salesList?.length > 0 && (
          <div className="mt-4">
            <h2 className="font-bold mb-2">Existing Flash Sale</h2>
            <div
              key={sale?._id}
              className="flex justify-between p-2 border rounded-md mb-2"
            >
              <div>
                {new Date(sale?.start).toLocaleString()} -{" "}
                {new Date(sale?.end).toLocaleString()}
              </div>
              <button
                onClick={() => handleDelete(sale._id)}
                className="bg-red-500 text-white p-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default FlashSaleManagement;
