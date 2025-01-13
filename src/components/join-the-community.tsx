// join-the-community.tsx

"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Users } from "lucide-react";

import SocialButton from "./ui/custom/social-button";

import join from "../../public/assets/images/join.png";

// Socials
const socials = [
  {
    name: "X",
    icon: "/assets/icons/social/x.svg",
    alt: "X",
    link: "https://x.com/ApeSafariClub",
  },
  {
    name: "Facebook",
    icon: "/assets/icons/social/facebook.svg",
    alt: "Facebook",
    link: "https://facebook.com/apesafari",
  },
  {
    name: "Discord",
    icon: "/assets/icons/social/discord.svg",
    alt: "Discord",
    link: "https://discord.com/apesafari",
  },
  {
    name: "Telegram",
    icon: "/assets/icons/social/telegram.svg",
    alt: "Telegram",
    link: "https://telegram.com/apesafari",
  },
];

export const JoinTheCommunity = () => {
  return (
    <section className="bg-chalky-200 p-6 md:p-16 flex flex-col justify-center items-center min-h-min">
      <div className="md:py-8 flex-col flexCenter relative md:max-w-[768px] w-full">
        {/* Pattern background for medium and larger devices */}
        <div className="hidden md:block absolute inset-0 bg-white rounded-xl overflow-hidden">
          <div className="absolute inset-2 bg-chalky-100 rounded-xl overflow-hidden">
            <div
              className="absolute inset-2 opacity-50"
              style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="rgb(232 175 55)" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>')`,
              }}
            />
          </div>
        </div>
        <Card className="md:max-w-md pt-2 w-full relative md:mt-4 md:mb-4 md:mx-4 bg-white">
          <CardHeader className="">
            <CardTitle className="flex flex-row flexCenter pb-2">
              <Users color="#e8af37" size={36} />
              <h2 className="mx-6 mb-1 tracking-wider uppercase text-3xl text-chalky-400 font-[family-name:var(--font-tribeca)] text-center">
                Join the Community
              </h2>
              <Users color="#e8af37" size={36} />
            </CardTitle>
            <CardDescription className="pt-2 font-normal text-center text-lg px-2">
              <span className="font-semibold text-gray-500">
                Connect, Share, and Grow with Us
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flexCenter">
            <Image
              src={join}
              alt="An ape dressed in safari clothes holding a calendar and pointing at it with his other hand."
              width={256}
              height={256}
              className="rounded-full border-4 border-chalky-400"
            />
            <div className="grid grid-cols-2 gap-4 mt-8">
              {socials.map((social) => (
                <SocialButton
                  key={social.name}
                  icon={social.icon}
                  link={social.link}
                  className="w-full"
                >
                  {social.name}
                </SocialButton>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center max-w-md w-full"></CardFooter>
        </Card>
      </div>
    </section>
  );
};
