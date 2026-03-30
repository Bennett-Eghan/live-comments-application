import { Topic, Tab } from '../types'
import manImg from '../assets/man.png'

interface TopicListProps {
  topics: Topic[]
  activeTab: Tab
  selectedTopicId: string | null
  onTabChange: (tab: Tab) => void
  onTopicClick: (topicId: string) => void
}

const TABS: { key: Tab; label: string }[] = [
  { key: 'conversations', label: 'Conversations' },
  { key: 'games', label: 'Games' },
  { key: 'news', label: 'News' },
  { key: 'stats', label: 'Stats' },
]

function BracketSvg({ isBottomLeft }: { isBottomLeft: boolean }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="10 10 80 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...(isBottomLeft
          ? { bottom: 2, left: -4 }
          : { top: 2, right: -2, transform: 'rotate(180deg)' }
        ),
      }}
    >
      <polygon points="10 10, 10 90, 90 90, 70 70, 30 70, 30 30" fill="white" />
    </svg>
  )
}

function ZoneBadge() {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: '0px 1px' }}>
      <BracketSvg isBottomLeft={false} />
      <BracketSvg isBottomLeft={true} />
      <span style={{ position: 'relative', zIndex: 1,}}>ZONE</span>
    </span>
  )
}

function CornerBracket({ position }: { position: 'top-right' | 'bottom-left' }) {
  const isBottomLeft = position === 'bottom-left'
  const gradId = isBottomLeft ? 'grad-bottom-left' : 'grad-top-right'

  return (
    <svg
      width="60"
      height="60"
      viewBox="10 10 80 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...(isBottomLeft
          ? { bottom: 12, left: '41%', zIndex: 0 }
          : { top: 15, right: 10, zIndex: 2, transform: 'rotate(180deg)' }
        ),
      }}
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="10" y1="10" x2="90" y2="90"
        >
          <stop offset="0%" stopColor={isBottomLeft ? '#00E650' : '#1e4813'} />
          <stop offset="100%" stopColor={isBottomLeft ? '#1e4813' : '#00E650'} />
        </linearGradient>
      </defs>
      <polygon
        points="10 10, 10 90, 90 90, 70 70, 30 70, 30 30"
        fill={`url(#${gradId})`}
      />
    </svg>
  )
}

export default function TopicList({ topics, activeTab, onTabChange, onTopicClick }: TopicListProps) {
  const visibleTopics = topics.filter((t) => t.tab === activeTab)

  return (
    <div className="flex flex-col h-full">
      {/* Hero Banner — gradient border wrapper */}
      <div
        className="mx-4 mt-4"
        style={{
          padding: 3,
          borderRadius: '22px 0px 22px 0px',
          background: 'linear-gradient(to top right, #006824 0%, #FFDF75 100%)',
        }}
        role="banner"
      >
      <div
        style={{
          borderRadius: '20px 0px 20px 0px',
          overflow: 'hidden',
          height: 184,
          background: 'radial-gradient(ellipse at center, #EFB800 0%, #E07D00 100%)',
          position: 'relative',
        }}
      >
        {/* Glow oval — left-center highlight */}
        <div style={{
          position: 'absolute',
          inset: 0,
          width: '60%',
          zIndex: 0,
          background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(255,220,100,0.35) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Concave bottom oval */}
        <div style={{
          position: 'absolute',
          bottom: -17,
          left: '-20%',
          width: '140%',
          height: 120,
          background: 'radial-gradient(ellipse at center, #EFB800 0%, #E07D00 100%)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        {/* Bottom-left bracket — z-index 0, behind player */}
        <CornerBracket position="bottom-left" />

        {/* Player image — z-index 1, between brackets */}
        <img
          src={manImg}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: -30,
            top: 25,
            height: '95%',
            width: '70%',
            objectFit: 'cover',
            objectPosition: 'top center',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Top-right bracket — z-index 2, in front of player */}
        <CornerBracket position="top-right" />

        {/* Text — left side */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '26px 0 16px 20px',
            zIndex: 10,
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2 }}>
            GOLF
          </p>
          <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 900, lineHeight: 1, marginBottom: 12 }}>
            Open<br />Talk
          </h1>
          <p style={{ color: '#fff', fontSize: 13, fontWeight: 900, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
            FAN <ZoneBadge />
          </p>
        </div>
      </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-[#FFFAED]">
        <div
          className="flex items-end px-4"
          role="tablist"
          aria-label="Content categories"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.key)}
                className={`relative py-3.5 mr-6 bg-transparent border-0 cursor-pointer whitespace-nowrap text-[15px] transition-colors duration-150
                  ${isActive ? 'font-bold text-[#1A1A1A]' : 'font-medium text-[#888]'}`}
              >
                {tab.label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: '#1B5E35',
                  }} />
                )}
              </button>
            )
          })}
        </div>
        {/* Full-width gradient line */}
        <div style={{ height: 1, background: 'linear-gradient(to right, #006824 30%, #FFDF75 100%)' }} />
      </div>

      {/* Topic Cards */}
      <div role="tabpanel" className="flex-1 overflow-y-auto px-4 py-3 pb-6">
        <ul className="flex flex-col gap-2.5 list-none">
          {visibleTopics.map((topic) => {
            return (
              <li key={topic.id}>
                <button
                  onClick={() => onTopicClick(topic.id)}
                  className="w-full text-left px-4 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors duration-200 border-0 bg-[#F5EAD3] hover:bg-[#1B5E35] group"
                  style={{ height: 86 }}
                  aria-label={`${topic.title}: ${topic.subtitle}`}
                >
                  <div>
                    <p className="font-bold text-base mb-1 text-[#1A1A1A] group-hover:text-white">
                      {topic.title}
                    </p>
                    <p className="text-sm leading-snug text-black group-hover:text-white">
                      {topic.subtitle}
                    </p>
                  </div>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M1 1l6 6-6 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white" />
                  </svg>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
