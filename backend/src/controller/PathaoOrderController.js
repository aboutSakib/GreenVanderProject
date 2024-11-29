const axios = require("axios");
const Store = require("../models/PathaoModel");

const getStores = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/aladdin/api/v1/stores`,
      {
        headers: {
          Authorization: `Bearer ${req.headers.authorization}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Server error" });
  }
};

// Additional CRUD operations can be implemented similarly

module.exports = {
  getStores,
};
