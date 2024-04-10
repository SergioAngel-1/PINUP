import Banner from "./Banner.jsx";
import SectionInformation from "./SectionInformation.jsx";
import SectionCards from "./SectionCards.jsx";
import SectionAboutUs from "./SectionAboutUs.jsx";
import SectionContact from "./SectionContact.jsx";
import Footer from "./Footer.jsx";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <header>
        <Banner />
      </header>
      <section>
        <SectionInformation />
      </section>
      <section>
        <SectionCards />
      </section>
      <section>
        <SectionAboutUs />
      </section>
      <section>
        <SectionContact />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
