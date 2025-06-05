import { type APIResults, type User } from "../types.d";

export const fetchUsers = async (context: { pageParam?: number }) => {
  const { pageParam = 1 } = context;

  return await fetch(
    `https://randomuser.me/api?results=10&seed=ricky&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch users");
      return (await res.json()) as APIResults;
    })
    .then((res: APIResults) => {
      const currentPage = Number(res.info.page);
      const nextCursor = currentPage > 10 ? undefined : currentPage + 1;

      return {
        users: res.results as User[],
        nextCursor,
      };
    });
};
