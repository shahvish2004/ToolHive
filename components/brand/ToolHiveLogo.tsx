'use client'

interface ToolHiveLogoProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function ToolHiveLogo({ size = 'medium', className = '' }: ToolHiveLogoProps) {
  const sizePx = { small: 48, medium: 64, large: 96 }
  const px = sizePx[size]

  return (
    <img
      src="https://i.ibb.co/Y7GF4qdw/2cmzqhj-removebg-preview.png"
      alt="ToolHive™ Logo"
      width={px}
      height={px}
      className={className}
      style={{
        width: px,
        height: px,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}