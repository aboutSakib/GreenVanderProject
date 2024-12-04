import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../../../Components/Ui/Loader";
import Container from "../../../shared/Container";

const fetchComboOffers = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await axios.get(
    `${apiUrl}/api/combo-offer/all-combo-offers`
  );
  return response.data;
};

const ComboOffer = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    data: comboOffers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comboOffers"],
    queryFn: fetchComboOffers,
  });

  if (isLoading || error) {
    return (
      <Loader
        isBorder={true}
        error={error}
        extraErrorMessage="Couldn't Load the offer."
        isLoading={isLoading}
        loadingText={"Combo offer is loading!"}
      />
    );
  }

  return (
    <div className="bg-white">
      <h1 className="text-black text-center sm:text-3xl font-bold">
        কম্বো অফার
      </h1>
      <Container>
        {comboOffers?.length > 0 ? (
          <a
            key={comboOffers[0]._id}
            href={comboOffers[0].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              className="w-full object-cover rounded-3xl h-full"
              src={apiUrl + "/" + comboOffers[0].imageUrl}
              alt={comboOffers[0].title}
            />
          </a>
        ) : (
          <p className="text-center font-semibold text-3xl">
            Combo Offer Comming soon
          </p>
        )}
      </Container>
    </div>
  );
};

export default ComboOffer;
