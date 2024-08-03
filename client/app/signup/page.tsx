"use client";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import { useReadContract, useReadContracts } from "wagmi";
import { wagmiConfig } from "@/context/config";
import { writeContract } from "@wagmi/core";
import { config } from "../../context/web3context";

import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../components/ui/hero-hightlight";
import axios from "axios";
import { log } from "console";

export default function SignupFormDemo() {
  const [publicKey, setPublic_key] = useState<string>("");
  const [privateKey, setPrivateKey] = useState("");
  const [displayName, setDisplayName] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form submitted");
    await axios
      .get("http://localhost:3003/generate_key")
      .then(async (res) => {
        console.log(res.data);
        const { public_key } = res.data;
        if (publicKey == "") {
          console.log("updating");
          setPublic_key(public_key);
        } else {
          console.log("Already setted", publicKey);
        }
        console.log("Hello from server44");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log("public key chnages", publicKey);
  }, [publicKey]);
  interface PrivateComponentProps {
    publicKey: string;
    displayName: string;
    privateKey: string; // Sensitive information should be handled with caution
  }

  const PrivateComponent: React.FC<PrivateComponentProps> = ({
    publicKey,
    displayName,
    privateKey,
  }) => {
    const [result, setResult] = useState<any>(null);
    const hasWritten = useRef(false); // Track if the write function has been called

    useEffect(() => {
      const writeData = async () => {
        try {
          const result = await writeContract(config, {
            abi: wagmiConfig.abi,
            address: wagmiConfig.address,
            functionName: "setpubKeyToDisplayName",
            args: [displayName, publicKey],
          });

          if (!result) {
            setResult(result);
          }
          console.log(result);
        } catch (error) {
          alert("Display Name already Taken or low Balance");
        }
      };

      if (publicKey && displayName && !hasWritten.current) {
        writeData();
        hasWritten.current = true; // Set the flag to true to prevent further calls
      }
    }, [publicKey, displayName]);

    return (
      <div className="w-100% text-sm">
        <div>{publicKey}</div>
        <div>{displayName}</div>
        <div>{privateKey}</div>
      </div>
    );
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
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </LabelInputContainer>
              {/* <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="Password" type="password" />
        </LabelInputContainer> */}
              <button
                className="bg-gradient-to-br text-sm relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Sign up &rarr;
                <BottomGradient />
              </button>
            </form>
          </div>
            <div>
              {publicKey && (
                <PrivateComponent
                  publicKey={publicKey}
                  displayName={displayName}
                  privateKey={privateKey}
                />
              )}
            </div>
        </motion.h1>
      </HeroHighlight>
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
