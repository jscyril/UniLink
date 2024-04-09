import { useState, useRef, useEffect } from "react";
import NavBar from "../components/NavBar";
import ClubCreate from "../components/ClubCreate";
import axios from "../api/axios";

export default function ClubCreateupdate() {
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };

  return (
    <div className="w-full relative py-20 bg-gray-400 overflow-hidden flex flex-col items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="self-stretch h-auto flex flex-col items-center justify-start gap-[10px] text-left text-5xl text-white font-inter lg:self-stretch lg:w-auto lg:flex-1 md:self-stretch md:w-auto sm:self-stretch sm:w-auto">
        <NavBar />
        <ClubCreate />
      </main>
    </div>
  );
}
