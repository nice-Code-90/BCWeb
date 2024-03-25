async function fetchData(url) {
  const response = await fetch(url);
  console.log(response);
  const json = await response.json();
  return json.value;
}

export default fetchData;
