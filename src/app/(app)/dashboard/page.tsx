import ShowcaseCard from "@components/showcase-card";
import { fetchFunc } from "@lib/fetch";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import { TestimonialTypeMongo } from "@schemas/testimonialSchema";
import { Button } from "@ui/button";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Showcase = ShowcaseTypeMongo & {
  testimonialCounts: {
    type: string;
    count: number;
  }[];
};

const DashboardPage = async () => {
  let showcases: Showcase[] | undefined = undefined;
  let testimonials: TestimonialTypeMongo[] | undefined = undefined;

  const [{ data: _showcases }, { data: _testimonials }] = await Promise.all([
    await fetchFunc.get<Showcase[]>("/showcase/my", { cache: "no-store" }),
    await fetchFunc.get<TestimonialTypeMongo[]>("/testimonial/all", {
      cache: "no-store",
    }),
  ]);

  showcases = _showcases;
  testimonials = _testimonials;

  const videoTestimonials = testimonials?.filter((e) => e.type === "video");
  const textTestimonials = testimonials?.filter((e) => e.type === "text");

  return (
    <div>
      <section className="grid gap-4 sm:gap-8">
        <div className="grid gap-4">
          <h3>Overview</h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-6 w-full grid place-content-center text-center border rounded-lg">
              <h5 className="font-medium leading-none mb-2">
                Text Testimonials
              </h5>

              <h3>{textTestimonials?.length}</h3>
            </div>

            <div className="p-6 w-full grid place-content-center text-center border rounded-lg">
              <h5 className="font-medium leading-none mb-2">
                Videos Testimonials
              </h5>

              <h3>{videoTestimonials?.length}</h3>
            </div>

            <div className="p-6 w-full grid place-content-center text-center border rounded-lg">
              <h5 className="font-medium leading-none mb-2">
                Total Testimonials
              </h5>

              <h3>{testimonials?.length}</h3>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <h3>Showcase {`(${showcases?.length || 0})`}</h3>

            <Button size="icon" className="flex sm:hidden rounded-full" asChild>
              <Link href="showcase/create">
                <Plus className="stroke-background w-5 h-5" />
              </Link>
            </Button>

            <Button className="hidden sm:flex" asChild>
              <Link href="showcase/create" className="group">
                Create a New Showcase
                <ArrowRight className="stroke-background w-5 h-5 ml-1 duration-200 ease-in-out transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid place-items-center">
            {showcases && showcases.length !== 0 && (
              <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {showcases.map((showcase) => (
                  <ShowcaseCard key={showcase._id} {...showcase} />
                ))}
              </div>
            )}

            {(!showcases || showcases.length === 0) && (
              <div className="grid text-center">
                <Image
                  width={500}
                  height={500}
                  className="w-64 h-64"
                  src="/assets/dashboard/empty-illustration.png"
                  alt="Empty Illustration"
                  draggable={false}
                />
                <p>No Showcase</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
