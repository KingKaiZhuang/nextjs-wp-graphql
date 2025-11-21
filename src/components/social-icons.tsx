import { url } from "inspector";
import Image from "next/image";

const socialIcons = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/zhuang_jun_kai/",
        image: "/social-icons/instagram.svg",
        alt: "Follow me on Instagram"
    },
    {
        name: "GitHub",
        url: "https://github.com/KingKaiZhuang",
        image: "/social-icons/github.svg",
        alt: "Follow me on GitHub"
    }
]

export function SocialIcons() {
    return(
        <div className="mb-4 flex justify-between">
            <h2 className="text-lg">Social Media</h2>
            <div className="flex gap-2">
                {socialIcons.map((icon) => (
                    <a key={icon.name} href={icon.url} target="_blank" rel="noopener noreferrer" className="p-1 rounded-md hover:scale-105 transition duration-3" >
                        <Image src={icon.image} alt={icon.alt} width={24} height={24} loading='eager' />
                    </a>
                ))}
            </div>
        </div>
    )
}