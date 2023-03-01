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
  Flex,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState, useContext, ChangeEvent } from "react";
import { API_BASE_URL } from "../const";
import { FormContext } from "../logic/form";
import noImage from "../assets/images/no-img.png";
import { SELECT_CATEGORY_INDEX } from "./const";
import { GuideStepContext } from "../logic/routing";

interface Attraction {
  thumbnail: string;
  label: string;
  details: string[];
  description: string;
  longtitude: string;
  latitude: string;
}

export const ViewAttractionsComponent = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { form } = useContext(FormContext);
  const { setGuideStep } = useContext(GuideStepContext);

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

  function handleMissingImage(e: ChangeEvent<HTMLImageElement>) {
    e.target.src = noImage;
  }

  function handleReadMoreClick(e: React.MouseEvent<HTMLButtonElement>) {
    // @ts-ignore
    const description = e.target.parentElement?.querySelector(".description");

    if (!description) {
      return;
    }

    description.style.whiteSpace = "unset";

    // @ts-ignore
    e.target.parentElement.removeChild(e.target);
  }

  return (
    <div className="SelectCategoryComponent">
      <Flex>
        <Button
          my={8}
          mr={2}
          onClick={() => setGuideStep(SELECT_CATEGORY_INDEX)}
        >
          Повернутись Назад
        </Button>
        <Box my={8}>
          <Button onClick={handleFinalize}>Почати Спочатку</Button>
        </Box>
      </Flex>

      <Text mb={2}>Рекомендації щодо обраних Вами критеріїв:</Text>
      {isLoading && <Spinner />}
      {(!attractions || !attractions.length) && !isLoading && (
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
      {attractions && Boolean(attractions.length) && !isLoading && (
        <SimpleGrid columns={3} spacing={10}>
          {attractions.map(
            (
              { thumbnail, label, description, details, longtitude, latitude },
              index
            ) => {
              return (
                <Card key={index}>
                  <CardBody>
                    <Image
                      onError={handleMissingImage}
                      src={thumbnail}
                      alt={label}
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{label}</Heading>
                      <Text
                        className="description"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {description}
                      </Text>
                      <Button onClick={handleReadMoreClick}>Читати далі</Button>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button
                        variant="ghost"
                        colorScheme="blue"
                        mr={4}
                        onClick={(e) => {
                          (e.target as HTMLButtonElement).hidden = true;
                          const element = document.getElementById(
                            `details_${label}`
                          );

                          if (element) {
                            element.removeAttribute("hidden");
                          }

                          const mapsButtonElement = document.getElementById(
                            `map_${label}`
                          );

                          if (mapsButtonElement) {
                            mapsButtonElement.setAttribute("hidden", "hidden");
                          }
                        }}
                      >
                        Більше Інформації
                      </Button>
                      {longtitude && latitude && (
                        <Box id={`map_${label}`}>
                          <Link
                            href={`https://maps.google.com/?q=${latitude},${longtitude}`}
                            target="_blank"
                          >
                            Показати на карті
                          </Link>
                        </Box>
                      )}
                      <Box
                        wordBreak="break-word"
                        hidden
                        id={`details_${label}`}
                      >
                        <ul>
                          {details &&
                            details.length &&
                            details.map((d, index) => (
                              <li key={index}>
                                <a href={d} target="_blank">
                                  {d}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </Box>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              );
            }
          )}
        </SimpleGrid>
      )}
    </div>
  );
};
