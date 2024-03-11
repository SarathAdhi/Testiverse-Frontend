import NotFoundPage from "@components/not-found-404";
import { fetchFunc } from "@lib/fetch";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import ShowcaseContainerWrapper from "../_components/showcase-container-wrapper";

type Props = {
  params: {
    slug: string;
  };
};

const ShowcaseWallEditPage = async ({ params }: Props) => {
  const showcase_slug = params?.slug;

  let { data: showcase, error } = await fetchFunc.get<ShowcaseTypeMongo>(
    `/showcase/my/${showcase_slug}`,
    {
      cache: "no-store",
    }
  );

  if (!showcase) return <NotFoundPage reason={"Showcase not found"} />;

  return (
    <ShowcaseContainerWrapper className="p-4" {...showcase}>
      <p>ShowcaseWallEditPage</p>
    </ShowcaseContainerWrapper>
  );
};

export default ShowcaseWallEditPage;
