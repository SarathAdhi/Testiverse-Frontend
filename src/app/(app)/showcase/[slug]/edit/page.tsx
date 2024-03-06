import { fetchFunc } from "@lib/fetch";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import React from "react";
import CreateShowcaseForm from "../../_components/create-showcase-form";
import NotFoundPage from "@components/not-found-404";

type Props = {
  params: {
    slug: string;
  };
};

const EditShowcasePage = async ({ params }: Props) => {
  const slug = params?.slug;

  let showcase: ShowcaseTypeMongo | null = null;
  let error;

  try {
    showcase = await fetchFunc.get(`/showcase/my/${slug}`, {
      cache: "no-store",
    });
  } catch (_error) {
    error = (_error as { message: string })?.message || (_error as string);
  }

  if (!showcase) return <NotFoundPage reason={error} />;

  return (
    <section>
      <CreateShowcaseForm
        _id={showcase._id}
        defaultValues={showcase}
        isUpdate
      />
    </section>
  );
};

export default EditShowcasePage;
