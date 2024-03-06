"use server";

import { fetchFunc } from "@lib/fetch";

type ReturnResponse = { message?: string; error?: string };

export async function deleteShowcase(_id: string) {
  try {
    const response = await fetchFunc.delete<ReturnResponse>(`/showcase/${_id}`);

    return response;
  } catch (_error) {
    const error =
      (_error as ReturnResponse)?.message ||
      (_error as ReturnResponse)?.error ||
      (_error as string);

    return { error } as ReturnResponse;
  }
}
