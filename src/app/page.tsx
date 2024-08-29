import Image from "next/image";
import Logout from "@/app/components/Logout";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl mb-5">Home</h1>
      <Logout />
    </div>
  );
}
