import NotFoundPage from "@components/not-found-404";
import { fetchFunc } from "@lib/fetch";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import { TestimonialTypeMongo } from "@schemas/testimonialSchema";
import "@smastrom/react-rating/style.css";
import ShowcaseContainerWrapper from "./_components/showcase-container-wrapper";
import TestimonialContainer from "./_components/testimonial-container";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    id: string;
    type: string;
    search: string;
    view: string;
  };
};

const ShowcasePage = async ({ params, searchParams }: Props) => {
  const showcase_slug = params?.slug;

  const testimonial_id = searchParams?.id || "";

  const type = searchParams?.type || "all";
  const search = searchParams?.search || "";
  const view = searchParams?.view || "columns";

  let showcase: ShowcaseTypeMongo | undefined = undefined;
  let testimonials: TestimonialTypeMongo[] = [];
  let testimonial: TestimonialTypeMongo | undefined = undefined;

  let error;

  const [{ data: _showcase }, { data: _testimonials }, { data: _testimonial }] =
    await Promise.all([
      await fetchFunc.get<ShowcaseTypeMongo>(`/showcase/my/${showcase_slug}`, {
        cache: "no-store",
      }),

      await fetchFunc.get<TestimonialTypeMongo[]>(
        `/testimonial/${showcase_slug}/all?type=${type}&search=${search}`,
        {
          cache: "no-store",
        }
      ),
      testimonial_id
        ? fetchFunc.get<TestimonialTypeMongo>(`/testimonial/${testimonial_id}`)
        : Promise.resolve({ data: undefined } as { data: undefined }),
    ]);

  showcase = _showcase;

  testimonials = _testimonials || [];

  testimonial = testimonial_id ? _testimonial : undefined;

  if (!showcase) return <NotFoundPage reason={error} />;

  const {
    slug,
    _id,
    isDarkTheme,
    name,
    buttonData,
    image,
    collectStarRating,
    collection,
    customFields,
    headerTitle,
    message,
    questions,
  } = showcase;

  const isDrawerOpened = !!testimonial_id;

  return (
    <ShowcaseContainerWrapper {...showcase}>
      <TestimonialContainer
        {...{
          testimonials,
          type,
          view,
          isDrawerOpened,
          testimonial: testimonial,
          startUrl: `/showcase/${slug}`,
        }}
      />
    </ShowcaseContainerWrapper>
  );
};

export default ShowcasePage;
