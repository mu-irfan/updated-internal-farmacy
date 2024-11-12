import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = ({ title }: any) => {
  const router = useRouter();

  return (
    <div className="md:flex items-center justify-between">
      <h2 className="text-3xl font-bold text-primary">{title}</h2>
      <h3
        className="text-md lg:pl-2 font-normal py-2 dark:text-farmacieGrey cursor-pointer"
        onClick={() => router.back()}
      >
        <MoveLeft className="inline mr-1 mb-1 w-6 h-6" />
        Back
      </h3>
    </div>
  );
};

export default Header;
