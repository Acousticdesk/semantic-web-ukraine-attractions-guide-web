import {
  Text,
  Button,
  Spinner,
  Card,
  CardBody,
  Stack,
  Heading,
  Image,
  Divider,
  CardFooter,
  ButtonGroup,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { API_BASE_URL } from "../const";
import { FormContext } from "../logic/form";

interface Attraction {
  thumbnail: string;
  label: string;
  details: string[];
  description: string;
}

export const ViewAttractionsComponent = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { form } = useContext(FormContext);

  useEffect(() => {
    let url = `${API_BASE_URL}/regions/${form.region}/attractions?`;

    const params = {
      city: form.city,
      category: form.category,
    };

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url += url.split("?")[1] ? `&${key}=${value}` : `${key}=${value}`;
      }
    });

    setIsLoading(true);

    fetch(url)
      .then((r) => r.json())
      .then(setAttractions)
      .finally(() => setIsLoading(false));
  }, []);

  const handleFinalize = () => {
    window.location.reload();
  };

  return (
    <div className="SelectCategoryComponent">
      <Box my={8}>
        <Button onClick={handleFinalize}>Почати Спочатку</Button>
      </Box>
      <Text mb={2}>Рекомендації щодо обраних Вами критеріїв:</Text>
      {isLoading && <Spinner />}
      {attractions && attractions.length ? (
        <SimpleGrid columns={3} spacing={10}>
          {attractions.map(({ thumbnail, label, description, details }) => {
            return (
              <Card key={label}>
                <CardBody>
                  <Image src={thumbnail} alt={label} borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{label}</Heading>
                    <Text>{description}</Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      onClick={(e) => {
                        (e.target as HTMLButtonElement).hidden = true;
                        const element = document.getElementById(
                          `details_${label}`
                        );

                        if (element) {
                          element.removeAttribute("hidden");
                        }
                      }}
                    >
                      Більше Інформації
                    </Button>
                    <div hidden id={`details_${label}`}>
                      <ul>
                        {details &&
                          details.length &&
                          details.map((d) => (
                            <li>
                              <a href={d} key={d} target="_blank">
                                {d}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      ) : (
        <>
          <Text>
            Вибачте, таких місць ми не змогли знайти, спробуйте використати інші
            параметри пошуку
          </Text>
          <Box my={8}>
            <Button onClick={handleFinalize}>Почати Спочатку</Button>
          </Box>
        </>
      )}
    </div>
  );
};
