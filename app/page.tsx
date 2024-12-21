// "use client";

import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import Tetrises from "@/app/ui/tetris/tetrises";

import Pusher from "pusher-js";
import Lobby from "./ui/tetris/lobby";
// import "@twa-dev/sdk";

export default function Page() {
  // const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;

  // console.log("PUSHER KEY " + pusherKey);

  // var pusher = new Pusher(pusherKey as string, {
  //   cluster: "eu",
  // });

  // Creating Channel is Easy - Just Subscribe to a Channel
  // If not exists will create it
  // There are 4 types of channels
  // 1 - public anyone knowing name can subscribe to it
  // 2 - private prefix necessary - Control Access
  // 3 - Private encrypted - should have private-encrypted- prefix "Not even pusher can decrypt messages"
  // 4 - presence- let you register user info on subscription and let other membets know who is online
  // var channel = pusher.subscribe("my-channel");
  // var channel2 = pusher.subscribe("my-channel2");
  // var channel3 = pusher.subscribe("my-channel3");

  // var channels = pusher.allChannels();

  // // Unsubscribe from channel must be done with the same Pusher instance
  // // EXAMPLE: // pusher.unsubscribe("my-channel");
  // // pusher.unsubscribe("my-channel");
  // pusher.allChannels().map((x) => console.log(x));
  // // Start receiveing messages on specific event
  // channel.bind("my-event", function (data: any) {
  //   console.log(data);
  //   alert(JSON.stringify(data));
  // });

  // channel.bind("player-1", function (data: any) {
  //   console.log(data);
  //   alert(JSON.stringify(data));
  // });

  // channel.bind("player-2", function (data: any) {
  //   console.log(data);
  //   alert(JSON.stringify(data));
  // });

  return (
    <main className="flex min-h-screen flex-col p-6">
      <Lobby />
      {/* {renderChannels()} */}
      {/* <Tetrises /> */}

      {/* <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
          <p
            className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className}`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={480}
            height={760}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
            loading="lazy"
          />
        </div>
      </div> */}
    </main>
  );
}
