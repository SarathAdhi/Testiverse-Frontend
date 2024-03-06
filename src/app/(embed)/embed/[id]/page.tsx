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

  let testimonials: TestimonialTypeMongo[] = [];
  let error;

  try {
    testimonials = await fetchFunc.get(`/testimonial/${slug}/all`, {
      cache: "no-store",
    });
  } catch (_error) {
    error = (_error as { message: string })?.message || (_error as string);
  }

  if (error) return <NotFoundPage reason={error} />;

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
