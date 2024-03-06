import NotFoundPage from "@components/not-found-404";
import { fetchFunc } from "@lib/fetch";
import { TestimonialTypeMongo } from "@schemas/testimonialSchema";

type Props = {
  params: {
    id: string;
  };
};

const ViewTestimonial = async ({ params }: Props) => {
  const testimonial_id = params?.id;

  let testimonial: TestimonialTypeMongo | null = null;

  let error;

  try {
    testimonial = await fetchFunc.get(`/testimonial/${testimonial_id}`, {
      cache: "no-store",
    });
  } catch (_error) {
    console.log(_error);
    error = (_error as { message: string })?.message || (_error as string);
  }

  if (!testimonial || error) return <NotFoundPage reason={error} />;

  return (
    <div>
      <div>
        <p>{testimonial?.text}</p>
      </div>
    </div>
  );
};

export default ViewTestimonial;
