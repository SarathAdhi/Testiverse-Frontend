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

  const { data: testimonial, error } =
    await fetchFunc.get<TestimonialTypeMongo>(
      `/testimonial/${testimonial_id}`,
      {
        cache: "no-store",
      }
    );

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
