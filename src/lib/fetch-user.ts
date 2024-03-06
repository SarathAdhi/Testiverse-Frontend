import { User } from "types/user";
import { fetchFunc } from "./fetch";

export async function fetchUser() {
  return fetchFunc
    .get("/auth/verify")
    .then((res) => res.data as User)
    .catch(() => null);
}
