import { Topic } from '../types'

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
      <div className="bg-[#FFFAED] rounded-3xl w-full max-w-sm shadow-2xl" style={{ padding: '28px 24px 32px' }}>
        {/* Mini hero card — gradient border wrapper */}
        <div
          className="mb-7"
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
              background: 'linear-gradient(to right, #F5A623 0%, #E8850A 100%)',
              position: 'relative',
              padding: '24px 20px 20px',
              minHeight: 150,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Bottom-left bracket — z-index 0 */}
            <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true"
              style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 0 }}>
              <defs>
                <linearGradient id="modal-grad-bl" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="60" y2="60">
                  <stop offset="0%" stopColor="#00E650" />
                  <stop offset="100%" stopColor="#402106" />
                </linearGradient>
              </defs>
              <path d="M0 0 L18 0 L18 42 L60 42 L60 60 L0 60 Z" fill="url(#modal-grad-bl)" />
            </svg>

            {/* Top-right bracket — z-index 2 */}
            <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true"
              style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, transform: 'rotate(180deg)' }}>
              <defs>
                <linearGradient id="modal-grad-tr" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="60" y2="60">
                  <stop offset="0%" stopColor="#402106" />
                  <stop offset="100%" stopColor="#00E650" />
                </linearGradient>
              </defs>
              <path d="M0 0 L18 0 L18 42 L60 42 L60 60 L0 60 Z" fill="url(#modal-grad-tr)" />
            </svg>

            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6, zIndex: 1 }}>
              Topic
            </p>
            <h2 style={{ color: '#fff', fontWeight: 900, fontSize: 40, lineHeight: 1.15, textAlign: 'center', marginBottom: 14, zIndex: 1 }}>
              {topic.title}
            </h2>
            <p style={{ color: '#fff', fontSize: 12, fontWeight: 800, letterSpacing: 3, zIndex: 1 }}>
              FAN ZONE
            </p>
          </div>
        </div>

        <h3 className="font-black text-[#1A1A1A] text-center mb-2.5" style={{ fontSize: 20 }}>
          Become part of the conversation
        </h3>
        <p className="text-[15px] text-black text-center leading-snug mb-7">
          Sign in to participate in the topic
        </p>

        <button
          onClick={onSignIn}
          className="block w-full py-4 rounded-full bg-[#1B5E35] text-white text-base font-bold cursor-pointer hover:opacity-90 transition-opacity border-0 mb-3.5"
        >
          Sign in
        </button>
        <button
          onClick={onSignIn}
          className="block w-full rounded-full text-[#1B5E35] text-base font-bold cursor-pointer hover:opacity-70 transition-opacity bg-transparent"
          style={{ padding: '15px', border: '2px solid #1B5E35' }}
        >
          Create account
        </button>
      </div>
    </div>
  )
}
