import Image, { StaticImageData } from "next/image"

type LogoProps = {
  width?: number
  height?: number
  className?: string
  src?: string | StaticImageData
  alt?: string
}

export default function Logo({
  width = 100,
  height = 100,
  className = "",
  src = "/assets/logo.png",
  alt = "Logo",
}: LogoProps) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  )
}
