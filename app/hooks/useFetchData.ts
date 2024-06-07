import { useQuery } from "@tanstack/react-query";

export function useFetchData(path: string) {
  return useQuery([path], async () => {
    return fetch(path).then((res) => res.json());
  });
}
