import { GuideStepContext } from "./logic/routing";
import { FormContext } from "./logic/form";
import { SelectRegionComponent } from "./steps/SelectRegion.component";
import { useState } from "react";
import { Container, Text } from "@chakra-ui/react";
import { AppForm } from "./logic/interfaces";

function App() {
  const [guideStep, setGuideStep] = useState(0);
  const [form, setForm] = useState({} as AppForm);

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
            <SelectRegionComponent />
          </div>
        </Container>
      </FormContext.Provider>
    </GuideStepContext.Provider>
  );
}

export default App;
