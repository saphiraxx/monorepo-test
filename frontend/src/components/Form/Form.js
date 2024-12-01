import React from "react";
import { Preferences, Features, RecommendationType } from "./Fields";
import { SubmitButton } from "./SubmitButton";
import useProducts from "../../hooks/useProducts";
import useForm from "../../hooks/useForm";
import useRecommendations from "../../hooks/useRecommendations";

function Form() {

  const { preferences, features, products } = useProducts();

  const { formData, handleChange } = useForm({
    selectPreferences: [],
    selectFeatures: [],
    selectRecommendationType: "MultipleProducts",
  });

  const { getRecommendations, setRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recommendations = getRecommendations(formData);

    setRecommendations(recommendations);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(select) => handleChange("selectPreferences", select)}
      />

      <Features
        features={features}
        onFeatureChange={(select) => handleChange("selectFeatures", select)}
      />

      <RecommendationType
        onRecommendationTypeChange={(select) => handleChange("selectRecommendationType", select)}
      />

      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;