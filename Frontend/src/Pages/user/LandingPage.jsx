import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AcmeLogo } from "../../components/AcmeLogo"; 

const LandingPage = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      {/* Navbar */}
      <Navbar isBordered>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME PDF Editor</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Button auto light onClick={() => navigate("#")}>
              Features
            </Button>
          </NavbarItem>
          <NavbarItem isActive>
            <Button auto light onClick={() => navigate("#")}>
              Customers
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button auto light onClick={() => navigate("#")}>
              Integrations
            </Button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="">
            <Button auto light onClick={() => navigate("/login")}>
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              color="primary"
              onClick={() => navigate("/signup")}
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          Edit Your PDFs Effortlessly
        </h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Our PDF editor allows you to easily edit, annotate, and share PDF
          documents with ease. Sign up today to get started.
        </p>
        <div className="mt-8">
          <Button color="primary" size="lg" onClick={() => navigate("/signup")}>
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Features that You'll Love
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Edit Text
              </h3>
              <p className="text-gray-600">
                Modify text, fonts, and more directly within your PDF documents.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Annotate PDFs
              </h3>
              <p className="text-gray-600">
                Highlight, underline, and add comments with a variety of
                annotation tools.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Merge & Split PDFs
              </h3>
              <p className="text-gray-600">
                Easily merge multiple PDFs into one or split them into separate
                files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Editing Your PDFs?
        </h2>
        <p className="mb-8 text-lg">
          Sign up now and get a free trial for 30 days. No credit card required.
        </p>
        <Button
          color="primary"
          size="lg"
          variant="ghost"
          onClick={() => navigate("/signup")}
        >
          Sign Up Today
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-5xl mx-auto text-center">
          <p>&copy; 2024 ACME PDF Editor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
