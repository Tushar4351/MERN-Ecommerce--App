import ProductCard from "@/components/Shared/ProductCard";
import { Link } from "react-router-dom";
import Footer from "@/components/Shared/Footer";
import About from "@/components/Shared/About";
import Testimonials from "@/components/Shared/Testimonials";
import video from "../assets/branding.mp4";

const Home = () => {
  const addToCartHandler = () => {};

  return (
    <div>
      <section >
        <video autoPlay muted loop playsInline className="w-full">
          <source src={video} type="video/mp4" />
        </video>
      </section>

      <section className="mt-20 p-5">
        <div className="flex flex-col items-center">
          <h1 className="text-black text-center text-3xl font-semibold">
            Latest Products
          </h1>
          <p className="text-gray-500 text-center text-lg">
            Order it for you or for your beloved ones
          </p>
          <div className="w-full flex justify-end">
            <Link to="/search" className="findmore text-gray-500 text-lg">
              More
            </Link>
          </div>
        </div>
      </section>

      <section className="m-5">
        <div className="flex flex-wrap">
          <ProductCard
            productId="absjsjwjww"
            name="MackBook"
            photo="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
            price={100}
            stock={10}
            handler={() => {
              addToCartHandler;
            }}
          />
        </div>
      </section>

      <section>
        <About />
      </section>

      <section>
        <Testimonials />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
