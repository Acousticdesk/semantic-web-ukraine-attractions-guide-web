import { Select, Text, Skeleton, Button } from "@chakra-ui/react";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { GuideStepContext } from "../logic/routing";
import { SELECT_REGION_INDEX } from "./const";
import { API_BASE_URL } from "../const";
import { trimRegionNamespace } from "../regions/utils";
import { FormContext } from "../logic/form";
import { AppForm } from "../logic/interfaces";

export const SelectRegionComponent = () => {
  const [regions, setRegions] = useState([]);
  const { form, setForm } = useContext(FormContext);
  const { setGuideStep } = useContext(GuideStepContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/regions`)
      .then((r) => r.json())
      .then(setRegions);
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
    <GuideStepContext.Consumer>
      {({ guideStep }) =>
        guideStep !== SELECT_REGION_INDEX ? null : (
          <div className="SelectCityComponent">
            <Text mb={2}>Будь-ласка, оберіть область куди ви подорожуєте</Text>
            {regions && regions.length ? (
              <Select onChange={handleSelectChange} mb={4}>
                {regions.map((r) => {
                  const region = trimRegionNamespace(r);
                  return (
                    <option key={r} value={r}>
                      {region}
                    </option>
                  );
                })}
              </Select>
            ) : (
              <Skeleton height="20px" />
            )}
            <Button disabled={!form.region} onClick={handleSubmit}>
              Обрати
            </Button>
          </div>
        )
      }
    </GuideStepContext.Consumer>
  );
};
