// src/components/PageSettings.js

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import Container from "../../shared/Container";

function AboutUs() {
  const apiUrl = import.meta.env.VITE_API_URL;
  // Update to use object form for useQuery
  const { data, error, isLoading } = useQuery({
    queryKey: ["pageSettings"],
    queryFn: async () => {
      const response = await axios.get(
        `${apiUrl}/api/page-settings/get-settings`
      );
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
      <Helmet>
        <title>About Us | Greenvandar</title>
      </Helmet>
      <Container>
        <div>
          <h2 className="text-lg font-semibold">About Us:</h2>
          <p>{data.aboutUs}</p>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
