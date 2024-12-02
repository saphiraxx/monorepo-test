// recommendation.service.js

/**
 * Product recommendations based on selected preferences and functionalities.
 *
 * @param {Object} formData
 * @param {Array} products
 * @returns {Array|Object|null}
 */
const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], recommendationType: "MultipleProducts" },
  products = []
) => {
  // destructuring 
  const { selectedPreferences, selectedFeatures, recommendationType } = formData;

  const filteredProducts = products.filter((product) => {
    // are valid arrays?
    const productPreferences = Array.isArray(product.preferences) ? product.preferences : [];
    const productFeatures = Array.isArray(product.features) ? product.features : [];

    const validPreferences =
      selectedPreferences.length === 0 ||
      selectedPreferences.every((preference) => productPreferences.includes(preference));

    const validFeatures =
      selectedFeatures.length === 0 ||
      selectedFeatures.every((feature) => productFeatures.includes(feature));

    return validPreferences && validFeatures;
  });

  if (recommendationType === "SingleProduct") {
    return filteredProducts.length > 0 ? filteredProducts[filteredProducts.length - 1] : null;
  }

  return filteredProducts;
};

export default { getRecommendations };