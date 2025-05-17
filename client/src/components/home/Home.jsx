import React from "react";
import { useEffect } from "react";

export const Home = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };


   useEffect(() => {
    gsap.to("#hero", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
    });
  }, []);
  return (
    <div className="overflow-hidden relative w-12/13 m-auto bg-[#111] text-white px-6 py-10 font-sans">
      {/* Header */}
      <header className="flex flex-row justify-between items-center md:mb-[150px] ">
        <div className="text-5xl font-bold mb-4 md:mb-0">Positivus</div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-4 mb-4 md:mb-0 lg:hidden">
          <button onClick={handleMenuToggle}>
            <i
              className={`text-3xl ${
                menuOpen ? "ri-close-line" : "ri-menu-3-line"
              }`}
            ></i>
          </button>
        </div>

        <nav
          className={`
    absolute top-20 left-0 w-full bg-[#111] flex flex-col items-center gap-4 py-6 z-10 transition-all duration-300 ease-in-out lg:flex lg:flex-row lg:static lg:w-fit lg:bg-transparent lg:gap-9 lg:py-0
    ${menuOpen ? "block" : "hidden"}
    
  `}
        >
          <ul className="flex flex-col lg:flex-row gap-6 text-2xl mb-4 md:mb-0 items-center">
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">Use Cases</li>
            <li className="cursor-pointer">Pricing</li>
            <li className="cursor-pointer">Blog</li>
          </ul>
          <button className="bg-transparent border-1 text-white px-4 py-2 rounded hover:bg-white hover:border-white hover:text-black transition duration-300 ease-in-out">
            Request a quote
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-10 mt-9 md:-mt-[250px] lg:mt-0">
        <div className="text-center md:text-left md:mt-9 w-full md:w-1/2">
          <h2 className=" lg:leading-17 xl:leading-27 lg:w-xl md:w-[300px]  text-2xl font-thin md:text-4xl  lg:text-5xl xl:text-6xl  2xl:text-8xl font-semibold mb-4 
          xl:w-[700px] ">
            Navigating the digital landscape for success
          </h2>
          <p className="mb-4 text-l lg:w-[500px] text-gray-300">
            Our digital marketing agency helps businesses grow and succeed
            online through a range of tailored services including SEO, PPC,
            social media marketing, and more.
          </p>
          <button className="bg-white text-black px-4 py-2 rounded">
            Book a consultation
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          {/* Replace with actual image if needed */}
          <div className="text-xl">
            <img className="h-fit  size-auto md:size-[700px]" src="https://static.semrush.com/blog/uploads/media/22/12/2212e237ecd8feffea1ec3b2d52cbd37/17fcb59146cd3d59512364d5b19392ea/affiliate-marketing-programs.svg" alt="" />
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="flex flex-wrap justify-center gap-6 text-gray-400 mb-10">
        <span>Amazon</span>
        <span>Dribbble</span>
        <span>HubSpot</span>
        <span>Notion</span>
        <span>Netflix</span>
        <span>Zoom</span>
      </section>

      {/* Services Section */}
      <section>
        <h3 className="text-[#9fff00] text-lg font-semibold mb-2">Services</h3>
        <p className="text-gray-300 mb-8 max-w-2xl">
          At our digital marketing agency, we offer a range of services to help
          businesses grow and succeed online.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#9fff00] text-black p-6 rounded-lg flex flex-col justify-between">
            <h4 className="font-semibold mb-4">Search engine optimization</h4>
            <button className="border border-black px-3 py-1 rounded w-max">
              Learn more
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-[#9fff00] text-black p-6 rounded-lg flex flex-col justify-between">
            <h4 className="font-semibold mb-4">Pay-per-click advertising</h4>
            <button className="border border-black px-3 py-1 rounded w-max">
              Learn more
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1a1a1a] text-white p-6 rounded-lg flex flex-col justify-between">
            <h4 className="font-semibold mb-4">Social Media Marketing</h4>
            <button className="border border-white px-3 py-1 rounded w-max">
              Learn more
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white text-black p-6 rounded-lg flex flex-col justify-between">
            <h4 className="font-semibold mb-4">Email Marketing</h4>
            <button className="border border-black px-3 py-1 rounded w-max">
              Learn more
            </button>
          </div>

          {/* Card 5 */}
          <div className="bg-white text-black p-6 rounded-lg flex flex-col justify-between">
            <h4 className="font-semibold mb-4">Content Creation</h4>
            <button className="border border-black px-3 py-1 rounded w-max">
              Learn more
            </button>
          </div>

          {/* Card 6 */}
          <div className="bg-[#1a1a1a] text-white p-6 rounded-lg flex flex-col justify-between">
            <h4 className="font-semibold mb-4">Analytics & Tracking</h4>
            <button className="border border-white px-3 py-1 rounded w-max">
              Learn more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
