import { Text, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { API_BASE_URL } from "../const";
import { FormContext } from "../logic/form";

export const ViewAttractionsComponent = () => {
  const [attractions, setAttractions] = useState([]);
  const { form } = useContext(FormContext);

  useEffect(() => {
    const url = form.city
      ? `${API_BASE_URL}/cities/${form.city}/attractions`
      : `${API_BASE_URL}/regions/${form.region}/attractions`;

    fetch(form.category ? url + `?category=${form.category}` : url)
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
        <ul>
          {attractions.map((a) => {
            return <li key={a}>{a}</li>;
          })}
        </ul>
      ) : (
        <Spinner />
      )}
      <div>
        <Button onClick={handleFinalize}>Спочатку</Button>
      </div>
    </div>
  );
};
