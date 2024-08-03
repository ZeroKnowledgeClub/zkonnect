"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../components/ui/hero-hightlight";
import axios from "axios";
import { log } from "console";
import { useReadContract } from "wagmi";
import { wagmiConfig } from "../../context/config";
import { useRouter } from "next/navigation";
import { useDisplayName } from "../../context/displayName";
import { stringify } from "querystring";

interface ReadFromContractProps {
  publicKey: string;
}
const ReadFromContract: React.FC<ReadFromContractProps> = ({ publicKey }) => {
  const { data: displayName } = useReadContract({
    ...wagmiConfig,
    functionName: "getDisplayName",
    args: [publicKey],
  });
  console.log(displayName);
  const router = useRouter();
  const { setDisplayName } = useDisplayName();

  useEffect(() => {
    if (displayName) {
      console.log(displayName);
      setDisplayName(displayName as string);

      // Navigate to the home page when displayName is available
      router.push("/feed");
    }
  }, [displayName, router]);

  return <div></div>;
};
export default function SignupFormDemo() {
  const privateKeyRef = useRef<HTMLInputElement>(null);
  const [publicKey, setPublic_key] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    const privateKeyValue = privateKeyRef.current?.value;
    const response = await axios
      .post("http://localhost:3003/get_public_key", {
        privateKey: privateKeyValue,
      })
      .then((res) => {
        console.log(res.data);
        const { public_key } = res.data;
        if (publicKey == "") {
          console.log("updating");
          setPublic_key(public_key);
        } else {
          console.log("Already setted", publicKey);
        }
      });
    console.log(privateKeyValue);
  };
  return (
    <div className="min-h-screen relative">
      <HeroHighlight>
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
          <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              ZKonnect
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="private_key">Enter Private Key</Label>
                <Input
                  id="private_key"
                  placeholder="Private Key"
                  type="text"
                  ref={privateKeyRef}
                />
              </LabelInputContainer>

              <button
                className="bg-gradient-to-br text-sm relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Login &rarr;
                <BottomGradient />
              </button>
            </form>
          </div>
        </motion.h1>
      </HeroHighlight>
      {publicKey && <ReadFromContract publicKey={publicKey} />}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
