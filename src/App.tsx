import { GuideStepContext } from "./logic/routing";
import { FormContext, initialFormValues } from "./logic/form";
import { SelectRegionComponent } from "./steps/SelectRegion.component";
import { SelectCityComponent } from "./steps/SelectCity.component";
import { useState } from "react";
import { Container, Text } from "@chakra-ui/react";
import { AppForm } from "./logic/interfaces";
import {
  SELECT_REGION_INDEX,
  SELECT_CITY_INDEX,
  SELECT_CATEGORY_INDEX,
  VIEW_ATTRACTIONS_INDEX,
} from "./steps/const";
import { SelectCategoryComponent } from "./steps/SelectCategory.component";
import { ViewAttractionsComponent } from "./steps/ViewAttractions.component";

function App() {
  const [guideStep, setGuideStep] = useState(0);
  const [form, setForm] = useState({ ...initialFormValues } as AppForm);

  return (
    <GuideStepContext.Provider value={{ guideStep, setGuideStep }}>
      <FormContext.Provider value={{ form, setForm }}>
        <Container>
          <div className="App">
            <Text fontSize="5xl" mb={8}>
              Провідник по місцям України 🇺🇦
            </Text>
            <Text fontSize="xl" mb={8}>
              Для того щоб переглянути рекомендації, будь-ласка, оберіть область
              і місто
            </Text>
            {guideStep === SELECT_REGION_INDEX && <SelectRegionComponent />}
            {guideStep === SELECT_CITY_INDEX && <SelectCityComponent />}
            {guideStep === SELECT_CATEGORY_INDEX && <SelectCategoryComponent />}
            {guideStep === VIEW_ATTRACTIONS_INDEX && (
              <ViewAttractionsComponent />
            )}
          </div>
        </Container>
      </FormContext.Provider>
    </GuideStepContext.Provider>
  );
}

export default App;
