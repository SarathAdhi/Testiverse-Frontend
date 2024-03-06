import { fetchUser } from "@lib/fetch-user";
import { Button } from "@ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await fetchUser();

  return (
    <div className="flex flex-col items-center justify-center antialiased space-y-4">
      <div className="w-full">
        <div className="z-10 w-full h-[600px] md:h-[500px] text-center max-w-7xl mx-auto p-4 grid place-content-center gap-4">
          <h1>Effortlessly Gather Customer Testimonials</h1>

          <p className="max-w-4xl mx-auto text-gray-800 dark:text-gray-400">
            {`Acquiring testimonials can be a challenging task, but with
          Testimonial, we've simplified the process for you. In just minutes,
          effortlessly gather both text and video testimonials from your
          customers, eliminating the need for a developer or website hosting.`}
          </p>

          <div className="relative z-40">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="stroke-white dark:stroke-black transition-transform duration-200 ease-in-out ml-1 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-gray-100 p-10 pb-0">
          <Image
            width={2000}
            height={2000}
            className="w-full max-w-5xl mx-auto rounded-t-lg"
            src="/assets/home/hero.png"
            alt="Testiverse"
            draggable={false}
          />
        </div>
      </div>

      <section className="text-center">
        <h3>
          Seamlessly Embed Testimonials on Your Website - No Coding Required!
        </h3>

        <p className="max-w-5xl mx-auto">
          {`Introducing "Fusion Testify" - your go-to solution for showcasing
          customer testimonials with style. Simply copy and paste our HTML code
          to seamlessly integrate the full version into your website.`}
        </p>
      </section>

      <hr className="w-full " />

      <section className="grid lg:grid-cols-2 gap-10 md:gap-20">
        <div className="flex flex-col items-center text-left justify-center gap-4 md:gap-8">
          <h2 className="w-full">
            Testiverse users gather double the testimonials!
          </h2>

          <p className="text-lg leading-snug">
            {`Discover the Testiverse advantage and elevate your credibility with
            an abundance of testimonials. Here's what sets us apart:`}
          </p>

          <div className="flex flex-col gap-4">
            <p className="flex items-start text-foreground/90 leading-snug gap-2">
              <CheckCircle className="stroke-purple-500 mt-0.5 w-5 h-5 flex-shrink-0" />
              {`Craft your bespoke testimonial collection form in just 30 seconds.
              Whether it's inviting participants, sharing the form, or
              seamlessly embedding it anywhere on your platform, Testiverse
              simplifies the entire process.`}
            </p>

            <p className="flex items-start text-foreground/90 leading-snug gap-2">
              <CheckCircle className="stroke-purple-500 mt-0.5 w-5 h-5 flex-shrink-0" />
              Bid farewell to the manual hassle. Testiverse automates both video
              and text testimonial gathering, ensuring a seamless experience for
              you and your esteemed customers.
            </p>

            <p className="flex items-start text-foreground/90 leading-snug gap-2">
              <CheckCircle className="stroke-purple-500 mt-0.5 w-5 h-5 flex-shrink-0" />
              {`Take your testimonials to the next level with Testiverse's unique
              engagement feature. Foster deeper connections with your customers
              by enabling them to share their experiences in a more interactive
              and personalized manner.`}
            </p>
          </div>

          <div className="w-full">
            <Button asChild>
              <Link href="/auth">Sign up for free</Link>
            </Button>
          </div>
        </div>

        <div className="grid place-content-center">
          <Image
            width={1000}
            height={1000}
            className="w-full max-w-lg lg:max-w-full lg:w-fit h-fit"
            src="/assets/home/share-preview.png"
            alt="Share Preview"
          />
        </div>
      </section>

      <hr className="w-full " />

      <section className="text-center">
        <h3>
          Seamlessly Embed Testimonials on Your Website - No Coding Required!
        </h3>

        <p className="max-w-5xl mx-auto">
          {`Introducing "Fusion Testify" - your go-to solution for showcasing
          customer testimonials with style. Simply copy and paste our HTML code
          to seamlessly integrate the full version into your website.`}
        </p>
      </section>
    </div>
  );
}
