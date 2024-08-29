import Image from "next/image";
import Logout from "@/app/components/Logout";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Home</h1>
      <Logout/>
    </div>
  );
}
