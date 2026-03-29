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

function CornerBracket({ position }: { position: 'top-right' | 'bottom-left' }) {
  const isBottomLeft = position === 'bottom-left'
  const gradId = isBottomLeft ? 'grad-bottom-left' : 'grad-top-right'

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...(isBottomLeft
          ? { bottom: 12, left: '50%', zIndex: 0 }
          : { top: 20, right: 15, zIndex: 2, transform: 'rotate(180deg)' }
        ),
      }}
    >
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="0" y1="0" x2="60" y2="60"
        >
          <stop offset="0%" stopColor={isBottomLeft ? '#00E650' : '#402106'} />
          <stop offset="100%" stopColor={isBottomLeft ? '#402106' : '#00E650'} />
        </linearGradient>
      </defs>
      <path
        d="M0 0 L18 0 L18 42 L60 42 L60 60 L0 60 Z"
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
          height: 202,
          background: 'linear-gradient(to right, #F5A623 0%, #E8850A 100%)',
          position: 'relative',
        }}
      >
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
            top: 40,
            height: '90%',
            width: '56%',
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
            padding: '16px 0 16px 20px',
            zIndex: 1,
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 2 }}>
            GOLF
          </p>
          <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 900, lineHeight: 1, marginBottom: 12, textShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
            Open<br />Talk
          </h1>
          <p style={{ color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>
            FAN ZONE
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
                  className="w-full text-left px-4 py-4 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors duration-200 border-0 bg-[#F5EAD3] hover:bg-[#1B5E35] group"
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
