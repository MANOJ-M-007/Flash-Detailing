import React from "react";
import Banner from "../../components/userComponents/Banner";
import Navbar from "../../Layouts/userLayouts/Navbar";
import Cards from "../../components/userComponents/Cards";
import SmallBanner from "../../components/userComponents/SmallBanner";
import Footer from "../../Layouts/userLayouts/Footer";

const userHome = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Cards />
      <SmallBanner />
      <Footer />
    </>
  );
};

export default userHome;
