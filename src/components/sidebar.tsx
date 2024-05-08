import React from "react";
const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-32 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
      <a href="/">Home</a>
      <a href="/capsules">Capsules</a>
      <a href="/map">Map</a>
      <a href="/depots">Depots</a>
      <a href="/schedules">Schedules</a>
    </div>
  );
};

export default Sidebar;
