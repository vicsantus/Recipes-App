import { useEffect, useState } from 'react';
import recommendationFetch from '../../../services/fetchRecom';

export default function useApiResponse({ idPath, pathname, mOrD }) {
  const [apiResponse, setApiResponse] = useState(null);
  const [ingreds, setIngreds] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [youTubeId, setYouTubeId] = useState(null);
  const [nameToMap, setNameToMap] = useState('');
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const makeFetch = async () => {
      let url = '';
      if (mOrD) {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idPath}`;
      } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idPath}`;
      }
      const fetched = await fetch(url);
      const json = await fetched.json();
      setApiResponse(mOrD ? json.meals : json.drinks);
    };
    makeFetch();
  }, [idPath, pathname, mOrD]);

  useEffect(() => {
    if (apiResponse) {
      const ingre = Object
        .keys(apiResponse[0])
        .map((item) => (item.includes('strIngredient') ? item : null));
      const ingreWithOutNull = ingre.filter((item) => item !== null);
      const ingreExist = ingreWithOutNull?.map((igd) => apiResponse[0][igd]);
      const ingreExistNotNull = ingreExist
        .filter((item) => (item !== null) && (item !== ''));

      const measu = Object
        .keys(apiResponse[0])
        .map((item) => (item.includes('strMeasure') ? item : null));
      const measuWithOutNull = measu.filter((item) => item !== null);
      const measuExist = measuWithOutNull?.map((igd) => apiResponse[0][igd]);
      const measuExistNotNull = measuExist
        .filter((item) => (item !== null) && (item !== '') && (item !== ' '));
      setIngreds(ingreExistNotNull);
      setMeasure(measuExistNotNull);

      if (mOrD) {
        const a = apiResponse[0].strYoutube.split('=')[1];
        setYouTubeId(a);
      }
    }
  }, [apiResponse, mOrD]);

  useEffect(() => {
    const namePath = pathname.split('/');
    recommendationFetch(namePath[1]).then((res) => setRecommendation(res));
    if (namePath[1] === 'meals') {
      setNameToMap('Drink');
    }
    if (namePath[1] === 'drinks') {
      setNameToMap('Meal');
    }
  }, [pathname, apiResponse]);

  return ({
    apiResponse,
    ingreds,
    measure,
    youTubeId,
    nameToMap,
    recommendation,
  });
}
