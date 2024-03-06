import NotFoundPage from "@components/not-found-404";
import NextThemeProviders from "@components/theme-providers";
import { fetchFunc } from "@lib/fetch";
import { TestimonialTypeMongo } from "@schemas/testimonialSchema";
import EmbedContainer from "./(components)/EmbedContainer";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    theme?: string;
  };
};

const ViewEmbededPage = async ({ params, searchParams }: Props) => {
  const slug = params.id;

  const { data: testimonials, error } = await fetchFunc.get<
    TestimonialTypeMongo[]
  >(`/testimonial/${slug}/all`, {
    cache: "no-store",
  });

  if (!testimonials) return <NotFoundPage reason={error} />;

  return (
    <NextThemeProviders forcedTheme={searchParams?.theme || "light"}>
      <EmbedContainer
        id={slug}
        searchParams={searchParams}
        testimonials={testimonials}
      />
    </NextThemeProviders>
  );
};

export default ViewEmbededPage;
