import { Select, Text, Spinner, Button } from "@chakra-ui/react";
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

  function translateCategory(category: string) {
    const translations = {
      "dbc:Allegorical_sculptures_in_Ukraine": "Скульптури України (всі)",
      "dbc:National_parks_of_Ukraine": "Парки України",
      "dbc:World_Heritage_Sites_in_Ukraine": "Світові Памʼятки в Україні",
      "dbc:Ukrainian_restaurants": "Ресторани України",
      "dbc:Outdoor_sculptures_in_Ukraine": "Скульпутри України (на природі)",
      "dbc:Colossal_statues_in_Ukraine": "Статуї України",
      "dbo:ProtectedArea": "Захищені Місця України",
      "dbo:Reservoir": "Басейни України",
      "dbo:Stadium": "Стадіони України",
      "dbo:Museum": "Музеї України",
      "dbo:Airport": "Аеропорти України",
      "dbo:HistoricBuilding": "Історичні Будівлі України",
      "dbo:ArchitecturalStructure": "Архітектура України",
    };

    // @ts-ignore
    return translations[category] || category;
  }

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
        <Select defaultValue="" onChange={handleSelectChange} mb={4}>
          <option value="">Мене цікавлять всі рекомендації</option>
          {categories.map((c) => {
            return (
              <option key={c} value={c}>
                {translateCategory(c)}
              </option>
            );
          })}
        </Select>
      ) : (
        <Spinner />
      )}
      <div>
        <Button onClick={handleSubmit}>Обрати</Button>
      </div>
    </div>
  );
};
