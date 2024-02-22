import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

const Logo = () => {
    const year = new Date().getFullYear();
  return (
    <div className="hidden md:flex items-center gap-x-2">
        <Image
        src="/light-logo.svg"
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden"
        />
        <Image
        src="/logo.png"
        height="40"
        width="40"
        alt="Logo"
        className="hidden dark:block"
        />
        <p className={cn("font-semibold", font.className)}>
            Notion
        </p>
    </div>
  )
}

export default Logo