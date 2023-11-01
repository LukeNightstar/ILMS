import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            priority={false}
            className="w-auto h-auto"
            height={200}
            width={200}
            alt="logo"
            src="/logo.svg"
        />
    )
}