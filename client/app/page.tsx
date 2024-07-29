"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-hightlight"
import Link from "next/link";

export default function Home() {
  return (
      <div className="min-h-screen relative">
      <div className=" absolute top-4 right-20 z-50 mx-6">
      <button className="p-[3px]">
        <Link href={"/login"}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className=" text-xs px-4 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Login
            </div>
            </Link>
          </button>
        
          <button className="p-[3px] mx-5 absolute ">
          <Link href={"/signup"}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className=" text-xs px-4 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Signup
            </div>
            </Link>
      </button>
        </div>
    <HeroHighlight >
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold  text-neutral-700  dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        
        Connect with everyone with {" "}
        <Highlight className="text-black dark:text-white">
          ZKonnect
        </Highlight>
      </motion.h1>
    </HeroHighlight>
    </div>
  );
}
