"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const UseSearchParamsHandler = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  async function modifySearchParams(fieldValue: string, query: string) {
    const params = new URLSearchParams(searchParams);

    if (query) params.set(fieldValue, query);
    else params.delete(fieldValue);

    replace(`${pathname}?${params.toString()}`);
  }

  return { searchParams, pathname, modifySearchParams, replace };
};

export default UseSearchParamsHandler;
