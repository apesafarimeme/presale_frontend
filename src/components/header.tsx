// src/components/Header.tsx

import Image from "next/image";

// import rightPalmTree from "/assets/images/palmTree_r.png";
// import leftPalmTree from "/assets/images/palmTree_l.png";

export const Header = () => {
  return (
    <header className=" max-container padding-container p-6 flex flex-row justify-center">
      <Image
        src={"/assets/images/palmTree_l.png"}
        alt="Palm Tree"
        priority={true}
        className="relative"
        width={64}
        height={80}
        style={{
          width: "30px",
          height: "auto",
        }}
      />
      <h1 className="mx-3 text-4xl tracking-wider text-orange-500 font-[family-name:var(--font-tribeca)] text-center">
        ApeSafari
      </h1>
      <Image
        src={"/assets/images/palmTree_r.png"}
        alt="Palm Tree"
        priority={true}
        className="relative"
        width={64}
        height={80}
        style={{
          width: "30px",
          height: "auto",
        }}
      />
    </header>
  );
};
