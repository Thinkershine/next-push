// "use server";

// import bcrypt from "bcrypt";

// const pusherSecret = process.env.PUSHER_SECRET;
// const pusherAPPID = process.env.PUSHER_APP_ID;
// const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;

// console.log("API KEY " + pusherAPPID);
// console.log("SECRET KEY " + pusherSecret);
// console.log("PUSHER KEY " + pusherKey);

// const Pusher = require("pusher");

// function makeid(length: number): string {
//   let result = "";
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }

// const playerEventId = await bcrypt.hash(makeid(10), 10);

// const pusher = new Pusher({
//   appId: pusherAPPID,
//   key: process.env.NEXT_PUBLIC_PUSHER_KEY,
//   secret: pusherSecret,
//   cluster: "eu",
//   useTLS: true,
// });

// // Get Channels
// export async function getChannels(): Promise<string[]> {
//   const res = await pusher.get({
//     path: "/channels",
//   });

//   if (res.status === 200) {
//     const body = await res.json();
//     let channelsInfo: string[] = [];

//     for (let key in body.channels) {
//       channelsInfo.push(key);
//     }

//     return new Promise((resolve) => {
//       resolve(channelsInfo);
//     });
//   } else if (res.status === 400) {
//     console.error("Bad Request:", res.statusText);
//   }

//   return Promise.resolve([]);
// }

// const messages = [];
// messages.push("Wiadomości");

// var counter = 0;

// export async function renderChannels() {
//   return (
//     <>
//       <ul>
//         {/* {channels.map((channel) => {
//           return <li key={channel.name}>{channel.name}</li>;
//         })} */}
//         <li>1</li>
//       </ul>
//     </>
//   );
// }

// export async function createNewChannel(formData: FormData) {
//   // pusher.subscribe(formData.get("channelName") as string);
//   // pusher.allChannels().map((x) => console.log(x));
// }

// export async function increase() {
//   counter++;
//   console.log(counter);

//   // channel.emit("my-event", { message: counter });
// }

// export async function decrease() {
//   counter--;
//   console.log(counter);

//   // channel.emit("my-event", { message: counter });
// }
