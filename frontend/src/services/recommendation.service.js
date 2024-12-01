// getRecommendations.js

const getRecommendations = (
  formData = { selectPreferences: [], selectFeatures: [], recommendationType: "MultipleProducts" },
  products = []
) => {
  const { selectPreferences, selectFeatures, recommendationType } = formData;

  // Filter products based on preferences and functionalities
  const filteredProducts = products.filter(product => {
    
    // Checks all preferences are in the product
    const checkPreferences = selectPreferences.every(preference => 
      product.preferences.includes(preference)
    );

    // Checks all features are in the product
    const checkFeatures = selectFeatures.every(feature => 
      product.features.includes(feature)
    );

    return checkPreferences && checkFeatures;
  });

  // Return based on recommendationType
  if (recommendationType === "SingleProduct") {
    return filteredProducts.length > 0 ? filteredProducts[filteredProducts.length - 1] : null;
  }

  return filteredProducts;
};

export default { getRecommendations };