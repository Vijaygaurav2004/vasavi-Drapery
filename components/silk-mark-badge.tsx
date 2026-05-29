import Image from "next/image"

interface Props {
  variant?: "light" | "dark"
  showText?: boolean
  size?: "sm" | "md" | "lg"
  logoOnly?: boolean
}

const LOGO_HEIGHT = {
  sm: 36,
  md: 48,
  lg: 64,
} as const

export default function SilkMarkBadge({
  variant = "dark",
  showText = false,
  size = "md",
  logoOnly = false,
}: Props) {
  const textColor = variant === "light" ? "rgba(255,255,255,0.9)" : "hsl(20 15% 8%)"
  const subColor  = variant === "light" ? "rgba(255,255,255,0.6)" : "hsl(20 10% 45%)"
  const height    = LOGO_HEIGHT[size]

  const logo = (
    <Image
      src="/silk-mark-logo.png"
      alt="Silk Mark — certified by Central Silk Board, Govt. of India"
      width={Math.round(height * 0.85)}
      height={height}
      className="object-contain flex-shrink-0"
      style={{ height, width: "auto" }}
    />
  )

  if (logoOnly) {
    return <div className="inline-flex items-center">{logo}</div>
  }

  return (
    <div className="inline-flex items-center gap-3">
      {logo}

      {showText ? (
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: textColor, letterSpacing: "0.14em" }}
          >
            Silk Mark Verified
          </p>
          <p className="text-[0.65rem] font-light leading-relaxed mt-0.5" style={{ color: subColor }}>
            Certified by the Central Silk Board, Govt. of India.
            <br />
            Every saree carries a genuine Silk Mark label.
          </p>
        </div>
      ) : (
        <div>
          <p
            className="text-[0.65rem] font-semibold uppercase tracking-widest"
            style={{ color: textColor }}
          >
            Silk Mark Verified
          </p>
          <p className="text-[0.6rem] font-light" style={{ color: subColor }}>
            Govt. of India Certified
          </p>
        </div>
      )}
    </div>
  )
}
