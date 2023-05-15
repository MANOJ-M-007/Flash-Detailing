import React from "react";
import UserProfile from "../../components/userComponents/UserProfile";
import Footer from "../../Layouts/userLayouts/Footer";
import Navbar from "../../Layouts/userLayouts/Navbar";

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <UserProfile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
