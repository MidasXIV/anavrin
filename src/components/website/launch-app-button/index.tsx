import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

const LaunchAppButton: FC<unknown> = () => (
  <button type="button" className="p-4 font-semibold text-gray-100 border">
    <Link href="/dashboard">
      <div className="">
        <Image
          src="https://res.cloudinary.com/dispatchxyz/image/upload/f_auto/v1657564596/Landing%20Page/asset_connect-icon_mbdmv6.svg"
          alt="Join Us"
          width={20}
          height={18}
        />
        <span className="text-gray-600 pl-2 uppercase font-mono mb-2 text-center">Launch App</span>
      </div>
    </Link>
  </button>
);

export default LaunchAppButton;
