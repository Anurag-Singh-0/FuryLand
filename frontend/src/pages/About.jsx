import Title from "../components/Title";
import { images } from "../Images";
import NewsletterBox from "../components/NewsletterBox";

function About() {
  return (
    <div className=" border-black/10 border-t">
      <Title text1={"About"} text2={"us"} />
      <div className="flex flex-col justify-between items-center lg:flex-row gap-10 mt-5">
        <img
          src={images.aboutImage}
          className="lg:w-120 w-full h-100 object-cover object-right rounded-2xl"
        />
        <div>
          <p className="text-gray-700 mb-5 text-sm">
            Furyland was born out of a vision to redefine the online shopping
            experience and bring style, quality, and convenience to your
            doorstep. Our journey started with a simple mission: to create a
            platform where customers can effortlessly discover, explore, and
            shop a wide range of premium products—all in one place.
          </p>

          <p className="text-gray-700 mb-5 text-sm">
            From the beginning, we’ve been committed to curating a carefully
            selected collection that caters to all tastes and lifestyles.
            Whether you’re searching for the latest trends in fashion, home
            essentials, tech gadgets, or everyday must-haves, Furyland offers
            something for everyone—sourced from trusted brands and emerging
            creators alike.
          </p>
          <span className="font-semibold">Our Mission</span>
          <p className="text-gray-700 mt-2 text-sm">
            At Furyland, our mission is to deliver a shopping experience that
            blends innovation, trust, and satisfaction. We strive to empower our
            customers with seamless navigation, fast delivery, and reliable
            service—turning everyday shopping into something truly enjoyable.
            Your satisfaction is at the heart of everything we do, from your
            first click to the final delivery.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-gray-700 uppercase font-semibold text-xl">
          Why <span className="text-black">Choose us</span>
        </h1>

        <div className="flex lg:gap-8 gap-3 lg:flex-row flex-col md:flex-row mt-5">
          <div className="outline outline-black/30 p-5 flex flex-col gap-2 rounded-lg">
            <span className="text-[0.9rem] font-semibold">
              Quality You Can Trust
            </span>
            <p className="text-sm text-gray-600">
              Every product at Furyland is carefully curated and tested to meet
              our high standards, ensuring you get only the best in quality and
              reliability.
            </p>
          </div>
          <div className="outline outline-black/30 p-5 flex flex-col gap-2 rounded-lg">
            <span className="text-[0.9rem] font-semibold">
              Effortless Shopping
            </span>
            <p className="text-sm text-gray-600">
              Enjoy a smooth, user-friendly experience with our easy navigation,
              secure payments, and quick checkout process—designed for
              hassle-free shopping every time.
            </p>
          </div>
          <div className="outline outline-black/30 p-5 flex flex-col gap-2 rounded-lg">
            <span className="text-[0.9rem] font-semibold">
              Customer-First Support
            </span>
            <p className="text-sm text-gray-600">
              Our friendly and responsive support team is always ready to help
              you. Whether you have questions, concerns, or need assistance,
              your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-15">
        <NewsletterBox />
      </div>
    </div>
  );
}

export default About;
