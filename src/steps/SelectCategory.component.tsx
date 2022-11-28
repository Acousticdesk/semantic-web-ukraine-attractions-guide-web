import { Select, Text, Skeleton, Button } from "@chakra-ui/react";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { GuideStepContext } from "../logic/routing";
import { API_BASE_URL } from "../const";
import { FormContext } from "../logic/form";
import { AppForm } from "../logic/interfaces";
import { trimCategoryNamespace } from "../categories/utils";

export const SelectCategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const { setForm } = useContext(FormContext);
  const { setGuideStep } = useContext(GuideStepContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prevForm: AppForm) => ({
      ...prevForm,
      category: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setGuideStep(3);
  };

  return (
    <div className="SelectCategoryComponent">
      <Text mb={2}>Будь-ласка, оберіть чим саме ви цікавитеся</Text>
      {categories && categories.length ? (
        <Select onChange={handleSelectChange} mb={4}>
          <option value="">Мене цікавлять всі рекомендації</option>
          {categories.map((c) => {
            const category = trimCategoryNamespace(c);
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </Select>
      ) : (
        <Skeleton height="20px" />
      )}
      <Button onClick={handleSubmit}>Обрати</Button>
    </div>
  );
};
