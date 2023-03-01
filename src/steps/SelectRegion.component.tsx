import { Select, Text, Spinner, Button } from "@chakra-ui/react";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { GuideStepContext } from "../logic/routing";
import { API_BASE_URL } from "../const";
import { trimRegionNamespace } from "../regions/utils";
import { FormContext, initialFormValues } from "../logic/form";
import { AppForm } from "../logic/interfaces";

export const SelectRegionComponent = () => {
  const [regions, setRegions] = useState<string[]>([]);
  const [regionLabels, setRegionLabels] = useState<string[]>([]);
  const { form, setForm } = useContext(FormContext);
  const { setGuideStep } = useContext(GuideStepContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/regions`)
      .then((r) => r.json())
      .then(({ values, labels }) => {
        setRegions(values);
        setRegionLabels(labels);
      });
  }, []);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prevForm: AppForm) => ({
      ...prevForm,
      region: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setGuideStep(1);
  };

  return (
    <div className="SelectCityComponent">
      <Text mb={2}>Будь-ласка, оберіть область куди ви подорожуєте</Text>
      {regions && regions.length ? (
        <Select
          defaultValue={initialFormValues.region}
          onChange={handleSelectChange}
          mb={4}
        >
          {regions.map((r, index) => {
            const region = trimRegionNamespace(r);
            return (
              <option key={region} value={region}>
                {regionLabels[index]}
              </option>
            );
          })}
        </Select>
      ) : (
        <Spinner />
      )}
      <div>
        <Button disabled={!form.region} onClick={handleSubmit}>
          Обрати
        </Button>
      </div>
    </div>
  );
};
