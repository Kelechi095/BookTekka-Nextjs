import React from "react";
import Wrapper from "../Wrapper";
import FooterList from "./FooterList";
import { FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-slate-200 text-sm mt-16">
      <Wrapper>
        <div className="flex flex-col md:flex-row justify-between py-4">
          <section className="w-full md:w-1/2 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About the website</h3>
            <p className="mb-2">
              Booktekka is a web application for readers. Readers can recommend
              books to other readers, add recommended books to their library and
              keep track of their reading progress.
            </p>
            <p className="font-semibold">Created by Awoms Kelechi</p>
            <p>&copy; 2024 Booktekka</p>
          </section>

          <section>
            <FooterList>
              <h3 className="text-base font-bold mb-2">Contact</h3>

              <div className="flex gap-2 items-center">
                <IoMdMail className="cursor-pointer" />
                <p>awomskelechi@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaPhone />
                <p>+2348137031311</p>
              </div>
            </FooterList>
          </section>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
