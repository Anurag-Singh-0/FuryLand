import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LetestCollection from "../components/LetestCollection";
import NewsletterBox from "../components/NewsletterBox";

function Home() {
  return (
    <div>
      <Hero />
      <LetestCollection />
      <BestSeller />
      <NewsletterBox />
    </div>
  );
}

export default Home;
