import { Link } from "react-router-dom";
import { images } from "../Images";

function Footer() {
  return (
    <div className="flex justify-between flex-col lg:flex-row gap-8 mb-8">
      <div className="flex flex-col w-full gap-3 lg:w-[40%]">
        <img src={images.logoDark} alt="Logo" className="w-[10rem] mb-3" />
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium,
          nostrum excepturi ut cupiditate quas in enim dolore a minus repellat.
        </p>
      </div>

      <div>
        <span className="text-xl uppercase font-semibold">Company</span>
        <div className="flex flex-col text-gray-600 gap-4 mt-5">
          <Link to="/" className="hover:text-black duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-black duration-200">
            About us
          </Link>
          <Link to="#" className="hover:text-black duration-200">
            Delivery
          </Link>
          <Link to="#" className="hover:text-black duration-200">
            Privacy policy
          </Link>
        </div>
      </div>

      <div>
        <span className="text-xl uppercase font-semibold">Get in touch</span>
        <div className="flex flex-col text-gray-600 gap-4 mt-5">
          <a href="tel:7678936521" className="hover:text-black duration-200">
            +91-7678-000-01
          </a>
          <a
            href="mailto:singh.anurag2026@gmail.com"
            className="hover:text-black duration-200"
          >
            singh.anurag2026@gmail.com
          </a>
          <a
            href="https://www.instagram.com/anurag.singh_04/"
            target="__blank"
            className="hover:text-black duration-200"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
