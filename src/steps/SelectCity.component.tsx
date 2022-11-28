import { Select, Text, Spinner, Button } from "@chakra-ui/react";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { GuideStepContext } from "../logic/routing";
import { API_BASE_URL } from "../const";
import { FormContext } from "../logic/form";
import { AppForm } from "../logic/interfaces";
import { trimCityNamespace } from "../cities/utils";

export const SelectCityComponent = () => {
  const [cities, setCities] = useState([]);
  const { form, setForm } = useContext(FormContext);
  const { setGuideStep } = useContext(GuideStepContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/regions/${form.region}/cities`)
      .then((r) => r.json())
      .then(setCities);
  }, []);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prevForm: AppForm) => ({
      ...prevForm,
      city: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setGuideStep(2);
  };

  return (
    <div className="SelectCityComponent">
      <Text mb={2}>Будь-ласка, оберіть місто куди ви подорожуєте</Text>
      {cities && cities.length ? (
        <Select onChange={handleSelectChange} mb={4}>
          <option selected value="">
            Вся область
          </option>
          {cities.map((c) => {
            const city = trimCityNamespace(c);
            return (
              <option key={city} value={city}>
                {city}
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
