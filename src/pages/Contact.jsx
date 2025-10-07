import Title from "../components/Title";
import { images } from "../Images";
import NewsletterBox from "../components/NewsletterBox"
import Button from "@mui/material/Button";

function Contact() {
  return (
    <div className="border-t border-black/10">
      <Title text1={"Contact"} text2={"us"} />

      <div className="flex flex-col sm:flex-row md:flex-row gap-10 mt-2 md:mt-5 mb-20">
        <div className="lg:w-[50%] w-full overflow-hidden">
          <img
            src={images.clothCover}
            className="object-cover rounded-xl outline outline-black/50 h-[100%]"
          />
        </div>

        <div>
          <h1 className="font-semibold text-xl">Our Store</h1>

          <div className="text-gray-600 flex flex-col gap-4 mt-5">
            <p className="w-[100%] lg:w-[60%]">
              80756 Petro Station Near Hazratganj, Lucknow – 226001 Uttar
              Pradesh, India
            </p>

            <div className="flex justify-between gap-2 w-[100%] lg:w-[50%]">
              <a href="tel:7678936521" className="hover:text-blue-700">
                +91 7678 **** 21
              </a>
              <a
                href="mailto:as1686864@gmail.com"
                className="hover:text-blue-700"
              >
                Email
              </a>
            </div>

            <div className="flex gap-3 flex-col items-baseline">
              <h1 className="text-xl font-semibold text-black">
                Careers at FuryLand
              </h1>
              <p>Learn more about our teams and job openings.</p>
              <Button className="px-4 py-2 !border !border-black rounded cursor-pointer !text-black hover:!bg-black hover:!text-white transition-all duration-200">
                Explore Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  );
}

export default Contact;
