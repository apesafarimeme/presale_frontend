import Image from "next/image";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  children: React.ReactNode;
  className?: string;
  icon: string;
  link: string;
}

const socialColors: { [key: string]: string } = {
  X: "bg-black hover:bg-gray-800",
  Facebook: "bg-[#1877F2] hover:bg-[#1664d9]",
  Discord: "bg-[#5865F2] hover:bg-[#454FBF]",
  Telegram: "bg-[#26A5E4] hover:bg-[#0088cc]",
};

const SocialButton: React.FC<SocialButtonProps> = ({
  children,
  className,
  icon,
  link,
}) => {
  const socialName = children?.toString() || "";
  const bgColor = socialColors[socialName] || "bg-gray-600 hover:bg-gray-700";

  const handleClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className={cn(
        "relative px-6 py-2 font-bold text-white rounded-full group",
        "transition-all duration-150 ease-in-out",
        "shadow-lg hover:shadow-xl",
        "flex items-center justify-center gap-2",
        bgColor,
        className
      )}
      onClick={handleClick}
      aria-label={`Connect with us on ${socialName}`}
    >
      <div className="relative w-6 h-6">
        <Image
          src={icon}
          alt={`${socialName} icon`}
          priority={true}
          fill
          sizes="24px"
          className="object-contain invert"
        />
      </div>
      <span className="text-sm font-medium">{children}</span>
    </button>
  );
};

export default SocialButton;
