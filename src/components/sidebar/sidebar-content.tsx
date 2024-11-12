import Image from "next/image";
import { SidebarLink } from "./sidebar";

const SidebarContent = ({ links, open }: { links: Link[]; open?: boolean }) => {
  return (
    <div className="mt-6 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center">
        <Image
          src="/assets/images/logo.png"
          className="w-16 flex-shrink-0 rounded-full"
          width={800}
          height={800}
          alt="Avatar"
        />
        {open && (
          <h1 className="text-3xl tracking-tighter font-bold text-farmacieDarkGreen pt-1 pl-1">
            Agronomics
          </h1>
        )}
      </div>
      <div className="mt-12 flex flex-col gap-3">
        {links.map((link, idx) => (
          <SidebarLink key={idx} link={link} />
        ))}
      </div>
    </div>
  );
};

export default SidebarContent;
