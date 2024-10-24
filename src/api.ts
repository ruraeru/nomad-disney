const BASE_URL = "https://disney_api.nomadcoders.workers.dev/characters";

export async function fetchCharacters() {
  return fetch(BASE_URL).then((res) => res.json());
}

export async function fetchDetail(id: string) {
  return fetch(`${BASE_URL}/${id}`).then((res) => res.json());
}
