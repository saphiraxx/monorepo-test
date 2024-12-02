import React from "react";
import { Preferences, Features, RecommendationType } from "./Fields";
import { SubmitButton } from "./SubmitButton";
import useProducts from "../../hooks/useProducts";
import useForm from "../../hooks/useForm";
import useRecommendations from "../../hooks/useRecommendations";

function Form() {
  const { preferences, features, products } = useProducts();

  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: "MultipleProducts",
  });

  const { getRecommendations, setRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData || !products || products.length === 0) {
      console.error("Formulário ou lista de produtos inválidos!");
      return;
    }

    try {
      const recommendations = getRecommendations(formData);

      if (!recommendations || (Array.isArray(recommendations) && recommendations.length === 0)) {
        console.warn("Nenhuma recomendação encontrada!");
        return;
      }

      setRecommendations(recommendations);
    } catch (error) {
      console.error("Erro ao gerar recomendações:", error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={Array.isArray(preferences) ? preferences : []}
        onPreferenceChange={(selected) => handleChange("selectedPreferences", selected)}
      />

      <Features
        features={Array.isArray(features) ? features : []}
        onFeatureChange={(selected) => handleChange("selectedFeatures", selected)}
      />

      <RecommendationType
        onRecommendationTypeChange={(selected) => handleChange("selectedRecommendationType", selected)}
      />

      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
