import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";
import {useState , useEffect} from 'react'

const Home = () => {

const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
const [currentReview, setCurrentReview] = useState(0);
  const imageContainer1 = [
    "/image (9).jpg",
    "/image (1).jpg",
    "/image (2).jpg",
    "/image (3).jpg",
    "/image (4).jpg",
    
  ]
  const imageContainer2 = [
    "/image (10).jpg",
    "/image (5).jpg",
    "/image (6).jpg",
    "/image (7).jpg",
    "/image (8).jpg",
  ]
  
  useEffect(() =>{
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageContainer1.length);
    }, 3000);
    const interval2 = setInterval(() => {
      setCurrentImageIndex2((prevIndex) => (prevIndex + 1) % imageContainer2.length);
    }, 3000);
     const interval3 = setInterval(() => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  }, 4000);
    return () => {
      clearInterval(interval);
      clearInterval(interval2);
      clearInterval(interval3);
    };

  }, [])
const reviews = [
  {
    id: 1,
    name: "Ahmed Hassan",
    rating: 5,
    review:
      "Amazing quality and super fast delivery. Definitely ordering again!",
  },
  {
    id: 2,
    name: "Sarah Ali",
    rating: 4,
    review:
      "Packaging was excellent and customer service was very helpful.",
  },
  {
    id: 3,
    name: "John Smith",
    rating: 5,
    review:
      "The checkout process was smooth and shipping was faster than expected.",
  },
  {
    id: 4,
    name: "Mariam Ibrahim",
    rating: 5,
    review:
      "One of the best online shopping experiences I've had.",
  },
];
  return (
    <main className="body">

      {/* Hero */}
      <section className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 lg:flex-row">

        <div className="max-w-2xl">
          <span className="welcome rounded-full bg-[#72470a] px-4 py-2 text-sm font-semibold text-white">
            Welcome to ShopX
          </span>
          <h1 className="main mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-7xl">
            Discover the Best Products
            <span className="main2 block text-[#8A735A]">
              at the Best Prices
            </span>
          </h1>

          <p className="description mt-6 text-lg leading-8 text-black ">
            ShopX is a modern e-commerce platform offering high-quality
            electronics, fashion, beauty, and lifestyle products with fast
            shipping and secure shopping.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="shop-now flex items-center gap-2 rounded-xl bg-[#72470a] px-8 py-4 font-semibold text-white transition hover:bg-[#BDA88B]"
            >
              Shop Now
              <FaArrowRight />
            </Link>

            <Link
              to="/signup"
              className="create-account rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-[#72470a] hover:text-white"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex-1 overflow-hidden rounded-3xl">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{
      transform: `translateX(-${currentImageIndex * 100}%)`,
    }}
  >
    {imageContainer1.map((image, index) => (
      <img
        key={index}
        src={image}
        alt={`Slide ${index}`}
        className="w-full max-w-xl flex-shrink-0 rounded-3xl"
      />
    ))}
  </div>
</div>
        </div>

      </section>

      {/* Features */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-14 text-center text-4xl font-bold">
            Why Choose ShopX?
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            <div className=" image rounded-3xl bg-[#F8F5F0] p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <FaShoppingBag
                className="mb-6 text-[#8A735A]"
                size={40}
              />

              <h3 className="mb-3 text-xl font-bold">
                Premium Products
              </h3>

              <p className="text-slate-500">
                Carefully selected products from trusted brands.
              </p>
            </div>

            <div className=" image rounded-3xl bg-[#F8F5F0] p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <FaShippingFast
                className="mb-6 text-green-600"
                size={40}
              />

              <h3 className="mb-3 text-xl font-bold">
                Fast Delivery
              </h3>

              <p className="text-slate-500">
                Receive your order quickly wherever you are.
              </p>
            </div>

            <div className=" image rounded-3xl bg-[#F8F5F0] p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <FaShieldAlt
                className="mb-6 text-red-500"
                size={40}
              />

              <h3 className="mb-3 text-xl font-bold">
                Secure Payment
              </h3>

              <p className="text-slate-500">
                Safe and encrypted payment methods for every purchase.
              </p>
            </div>

            <div className=" image rounded-3xl bg-[#F8F5F0] p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <FaHeadset
                className="mb-6 text-purple-600"
                size={40}
              />

              <h3 className="mb-3 text-xl font-bold">
                24/7 Support
              </h3>

              <p className="text-slate-500">
                Our team is always available to help you.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* About */}

     {/* About */}

<section className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row">

  {/* Slider */}
  <div className="w-full lg:w-1/2">
    <div className="overflow-hidden rounded-3xl shadow-xl">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex2 * 100}%)`,
        }}
      >
        {imageContainer2.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="h-[500px] min-w-full object-cover"
          />
        ))}
      </div>
    </div>
  </div>

  {/* Content */}
  <div className="w-full lg:w-1/2">

    <h2 className="text-4xl font-bold text-slate-900">
      Shopping Made Easy
    </h2>

    <p className="mt-6 text-lg leading-8 text-slate-600">
      We believe online shopping should be simple, fast, and enjoyable.
      ShopX combines a beautiful shopping experience with secure
      authentication, personalized carts, advanced search, sorting,
      pagination, and an admin dashboard.
    </p>

    <Link
      to="/shop"
      className="shop-now mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:bg-slate-700"
    >
      Browse Products
      <FaArrowRight />
    </Link>

  </div>

</section>

<section className="bg-white py-24">
  <div className="mx-auto max-w-5xl px-6">

    <h2 className="mb-3 text-center text-4xl font-bold">
      What Our Customers Say
    </h2>

    <p className="mb-12 text-center text-slate-500">
      Trusted by thousands of happy customers worldwide.
    </p>

    <div className="mx-auto max-w-3xl rounded-3xl bg-[#F8F5F0] p-10 text-center shadow-xl transition-all duration-700">

      {/* Stars */}
      <div className="mb-6 flex justify-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={`text-3xl ${
              index < reviews[currentReview].rating
                ? "text-yellow-400"
                : "text-slate-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review */}
      <p className="text-xl italic leading-9 text-slate-700">
        "{reviews[currentReview].review}"
      </p>

      {/* Avatar */}
      <div className="mt-10 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#72470a] text-xl font-bold text-white">
          {reviews[currentReview].name[0]}
        </div>
      </div>

      {/* Name */}
      <h3 className="mt-5 text-2xl font-bold">
        {reviews[currentReview].name}
      </h3>

      <p className="text-slate-500">
        Verified Customer
      </p>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {reviews.map((_, index) => (
          <button
          aria-label={`Go to review ${index + 1}`}
            key={index}
            onClick={() => setCurrentReview(index)}
            className={`h-3 w-3 rounded-full transition ${
              currentReview === index
                ? "bg-[#72470a]"
                : "bg-slate-300"
            }`}
          />
        ))}
      </div>

    </div>
  </div>
</section>

      {/* CTA */}

      <section className="bg-[#D4C4AD] py-24 text-center text-white">
        
        <h2 className="text-5xl font-bold">
          Ready to Start Shopping?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
          Thousands of customers trust ShopX every day. Join them and
          discover an amazing shopping experience.
        </p>

        <Link
          to="/shop"
          className="shop-now mt-10 inline-block rounded-xl bg-white px-8 py-4 font-bold text-[#8A735A] transition hover:scale-105"
        >
          Explore Products
        </Link>

      </section>

    </main>
  );
};

export default Home;