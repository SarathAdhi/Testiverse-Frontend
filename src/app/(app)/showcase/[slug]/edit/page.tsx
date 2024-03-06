import NotFoundPage from "@components/not-found-404";
import { fetchFunc } from "@lib/fetch";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import CreateShowcaseForm from "../../_components/create-showcase-form";

type Props = {
  params: {
    slug: string;
  };
};

const EditShowcasePage = async ({ params }: Props) => {
  const slug = params?.slug;

  const { data: showcase, error } = await fetchFunc.get<ShowcaseTypeMongo>(
    `/showcase/my/${slug}`,
    {
      cache: "no-store",
    }
  );

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
