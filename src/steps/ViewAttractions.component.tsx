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

    fetch(url)
      .then((r) => r.json())
      .then(setAttractions);
  }, []);

  const handleFinalize = () => {
    window.location.reload();
  };

  return (
    <div className="SelectCategoryComponent">
      <Text mb={2}>Рекомендації щодо обраних Вами критеріїв:</Text>
      {attractions && attractions.length ? (
        <Box>
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
        </Box>
      ) : (
        <Spinner />
      )}
      <Box mt={8}>
        <Button onClick={handleFinalize}>Спочатку</Button>
      </Box>
    </div>
  );
};
