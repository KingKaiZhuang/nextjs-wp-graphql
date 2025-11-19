import Image from "next/image";
export function Hero() {
    return(
        <div className="mb-4">
            <h1 className="font-bold text-2xl mb-2">Hi, I am StackPenguin</h1>
            <p className="mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et laudantium ex dolor quidem, sequi quaerat excepturi repellat ducimus, ratione consequuntur asperiores quia ullam! Architecto reiciendis perspiciatis id optio exercitationem aspernatur?</p>
            <Image src="/hero.webp" alt="StackPenguin" width={700} height={102} quality={70} placeholder="blur" blurDataURL="/hero-placeholder.png" loading="eager" />
        </div>
    )
}