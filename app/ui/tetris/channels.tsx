"use client";

interface Props {
  channels: string[];
}

export default function Channels({ channels }: Props) {
  return (
    <div>
      <h3>All Channels</h3>
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
        {channels.map((channel) => (
          <li key={channel} className="pb-3 sm:pb-4">
            {channel}
          </li>
        ))}
      </ul>
    </div>
  );
}
