import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsletterBox from "../components/NewsletterBox";

function Home() {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <NewsletterBox />
    </div>
  );
}

export default Home;
