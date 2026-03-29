import golfImg from '../assets/golf.png'
import roryImg from '../assets/rory.png'
import majorImg from '../assets/major.png'
import analyticalImg from '../assets/analytical.png'

interface AvatarProps {
  username: string
  size?: 'sm' | 'md' | 'lg'
}

const USER_IMAGES: Record<string, string> = {
  GolfFanatic_78: golfImg,
  Roryloyalist: roryImg,
  MajorMadness: majorImg,
  Analytical_Golfer: analyticalImg,
}

const PALETTE = [
  '#2D6A4F', '#1B4D8E', '#7B3F7A', '#B5451B',
  '#2C6E9B', '#5C4033', '#3D6B4F', '#7A5C1E',
]

function getColor(username: string): string {
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash)
  }
  return PALETTE[Math.abs(hash) % PALETTE.length]
}

const SIZE_CLASSES = {
  sm: 'w-9 h-9 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-11 h-11 text-base',
}

export default function Avatar({ username, size = 'md' }: AvatarProps) {
  const img = USER_IMAGES[username]

  if (img) {
    return (
      <img
        src={img}
        alt={username}
        className={`${SIZE_CLASSES[size]} rounded-full object-cover shrink-0 select-none`}
      />
    )
  }

  return (
    <div
      className={`${SIZE_CLASSES[size]} rounded-full flex items-center justify-center shrink-0 text-white font-bold select-none`}
      style={{ backgroundColor: getColor(username) }}
      aria-label={username}
    >
      {username.charAt(0).toUpperCase()}
    </div>
  )
}
