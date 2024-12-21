import {
  renderChannels,
  createNewChannel,
  increase,
  decrease,
  getChannels,
} from "@/app/lib/room-manager";
import { Button } from "../button";
import Channels from "./channels";
import Tetris from "./tetris";

export default async function Lobby() {
  let channels = await getChannels();

  return (
    <div>
      {/* <form action={createNewChannel}>
        <div className="mb-4">
          <label htmlFor="channelName" className="block text-sm font-medium">
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            className="mt-1 block w-full px-3 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
          />
        </div>
        <Button type="submit">CREATE NEW CHANNEL</Button>
        <div>
          <Channels channels={channels} />
        </div>
      </form> */}
      <Tetris />
    </div>
  );
}
