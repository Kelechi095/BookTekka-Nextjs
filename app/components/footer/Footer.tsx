import React from "react";
import Wrapper from "../Wrapper";
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-neutral-800 text-slate-200 text-sm mt-16">
      <Wrapper>
        <div className="flex flex-col md:flex-row justify-between py-4">
          
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About the website</h3>
            <p className="mb-2">
              Booktekka is a web application for readers. Readers can recommend
              books to other readers, add recommended books to their library and
              keep track of their reading progress.
            </p>
            <p className="font-semibold">Created by Awoms Kelechi</p>
            <p>&copy; 2024 Booktekka</p>
          </div>

          <div>
            <FooterList>
              <h3 className="text-base font-bold mb-2">Contact</h3>
              <div className="flex gap-2">
                <Link href="#">
                  <MdFacebook size={24} />
                </Link>
                <Link href="#">
                  <AiFillTwitterCircle size={24} />
                </Link>
                <Link href="#">
                  <AiFillInstagram size={24} />
                </Link>
                <Link href="#">
                  <AiFillYoutube size={24} />
                </Link>
              </div>
            </FooterList>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
