import { Topic } from '../types'

function ModalZoneBadge() {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: '0px 1px' }}>
      <svg width="10" height="8" viewBox="10 10 80 80" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: 'absolute', top: -2, right: -2, transform: 'rotate(180deg)' }}>
        <polygon points="10 10, 10 90, 90 90, 70 70, 30 70, 30 30" fill="white" />
      </svg>
      <svg width="8" height="8" viewBox="10 10 80 80" preserveAspectRatio="none" aria-hidden="true"
        style={{ position: 'absolute', bottom: 2, left: -4 }}>
        <polygon points="10 10, 10 90, 90 90, 70 70, 30 70, 30 30" fill="white" />
      </svg>
      <span style={{ position: 'relative', zIndex: 1 }}>ZONE</span>
    </span>
  )
}

interface AuthGateProps {
  topic: Topic
  onSignIn: () => void
  onDismiss: () => void
}

export default function AuthGate({ topic, onSignIn, onDismiss }: AuthGateProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in required"
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss() }}
    >
      <div className="bg-[#FFFAED] rounded-3xl w-full max-w-[320px] shadow-2xl" style={{ padding: '24px 20px 28px' }}>
        {/* Mini hero card — gradient border wrapper */}
        <div
          className="mb-6"
          style={{
            padding: 3,
            borderRadius: '22px 0px 22px 0px',
            background: 'linear-gradient(to top right, #006824 0%, #FFDF75 100%)',
          }}
        >
          <div
            style={{
              borderRadius: '20px 0px 20px 0px',
              overflow: 'hidden',
              background: 'radial-gradient(ellipse 50% 100% at center, #EFB800 0%, #E07D00 100%)',
              position: 'relative',
              minHeight: 130,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px 16px 16px',
            }}
          >
            {/* Glow oval */}
            <div style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              zIndex: 0,
              background: 'radial-gradient(ellipse 80% 60% at 25% 80%, rgba(255,220,100,0.5) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />

            {/* Concave bottom oval */}
            <div style={{
              position: 'absolute',
              top: 75,
              left: '-20%',
              width: '140%',
              height: 120,
              background: 'radial-gradient(ellipse at center, #EFB800 0%, #E07D00 100%)',
              borderRadius: '50%',
              zIndex: 0,
              pointerEvents: 'none',
            }} />

            {/* Bottom-left bracket */}
            <svg width="56" height="56" viewBox="10 10 80 80" preserveAspectRatio="none" aria-hidden="true"
              style={{ position: 'absolute', bottom: 8, left: 8, zIndex: 0 }}>
              <defs>
                <linearGradient id="modal-grad-bl" gradientUnits="userSpaceOnUse" x1="10" y1="10" x2="90" y2="90">
                  <stop offset="0%" stopColor="#00E650" />
                  <stop offset="100%" stopColor="#1e4813" />
                </linearGradient>
              </defs>
              <polygon points="10 10, 10 90, 90 90, 70 70, 30 70, 30 30" fill="url(#modal-grad-bl)" />
            </svg>

            {/* Top-right bracket */}
            <svg width="56" height="56" viewBox="10 10 80 80" preserveAspectRatio="none" aria-hidden="true"
              style={{ position: 'absolute', top: 18, right: 8, zIndex: 2, transform: 'rotate(180deg)' }}>
              <defs>
                <linearGradient id="modal-grad-tr" gradientUnits="userSpaceOnUse" x1="10" y1="10" x2="90" y2="90">
                  <stop offset="0%" stopColor="#1e4813" />
                  <stop offset="100%" stopColor="#00E650" />
                </linearGradient>
              </defs>
              <polygon points="10 10, 10 90, 90 90, 70 70, 30 70, 30 30" fill="url(#modal-grad-tr)" />
            </svg>

            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4, zIndex: 1 }}>
              Topic
            </p>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 34, lineHeight: 1.1, textAlign: 'center', marginBottom: 10, zIndex: 1 }}>
              {topic.title}
            </h2>
            <p style={{ color: '#fff', fontSize: 12, fontWeight: 900, letterSpacing: 2, zIndex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
              FAN <ModalZoneBadge />
            </p>
          </div>
        </div>

        <h3 className="font-black text-[#1A1A1A] text-center mb-2" style={{ fontSize: 18 }}>
          Become part of the conversation
        </h3>
        <p className="text-sm text-black text-center leading-snug mb-6">
          Sign in to participate in the topic
        </p>

        <button
          onClick={onSignIn}
          className="block w-full rounded-full bg-[#1B5E35] text-white text-base font-bold cursor-pointer hover:opacity-90 transition-opacity border-0 mb-3"
          style={{ height: 48 }}
        >
          Sign in
        </button>
        <button
          onClick={onSignIn}
          className="block w-full rounded-full text-[#1B5E35] text-base font-bold cursor-pointer hover:opacity-70 transition-opacity bg-transparent"
          style={{ height: 48, border: '2px solid #1B5E35' }}
        >
          Create account
        </button>
      </div>
    </div>
  )
}
