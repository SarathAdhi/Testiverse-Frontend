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

  let showcase: ShowcaseTypeMongo | null = null;
  let testimonials: TestimonialTypeMongo[] = [];
  let testimonial: TestimonialTypeMongo | null = null;

  let error;

  try {
    const [_showcase, _testimonials, _testimonial] = await Promise.all<
      [
        ShowcaseTypeMongo,
        TestimonialTypeMongo[],
        TestimonialTypeMongo | Promise<null>
      ]
    >([
      await fetchFunc.get(`/showcase/my/${showcase_slug}`, {
        cache: "no-store",
      }),

      await fetchFunc.get(
        `/testimonial/${showcase_slug}/all?type=${type}&search=${search}`,
        {
          cache: "no-store",
        }
      ),
      testimonial_id
        ? fetchFunc.get(`/testimonial/${testimonial_id}`)
        : Promise.resolve(null),
    ]);

    showcase = _showcase;

    testimonials = _testimonials;

    testimonial = testimonial_id ? _testimonial : null;
  } catch (_error) {
    console.log(_error);
    error = (_error as { message: string })?.message || (_error as string);
  }

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
