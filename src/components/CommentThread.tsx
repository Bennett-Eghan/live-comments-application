import { useEffect, useRef, useState, useCallback } from 'react'
import { Topic, Comment } from '../types'
import CommentCard from './CommentCard'
import Avatar from './Avatar'

interface CommentThreadProps {
  topic: Topic
  comments: Comment[]
  currentUser: string
  onBack: () => void
  onAddComment: (topicId: string, text: string, username: string) => void
  onReact: (topicId: string, commentId: string, emoji: string) => void
}

const LIVE_USERNAMES = [
  'BirdieBob', 'FairwayFred', 'EagleEye_Em', 'PutterPete', 'GolfGuru99',
  'RoughRider', 'IronMike_G', 'ChipShot_Al', 'BackswingBeth', 'CaddyCorner',
]

const LIVE_COMMENT_POOL: Record<string, string[]> = {
  rory: [
    "He needs to win one more before the window closes for good.",
    "The mental game is what separates him from the true greats at majors.",
    "Augusta is made for his game — I still believe he gets it done there.",
    "Rory in contention Sunday is appointment TV regardless.",
  ],
  'nicklaus-woods': [
    "18 majors is a mountain. Even Tiger couldn't get there.",
    "The rivalry that defined an era. Both are legends full stop.",
    "You can't separate them — different eras, different games.",
  ],
  'state-of-game': [
    "New courses being built is a great sign for the sport.",
    "Streaming deals will bring younger fans in. Give it time.",
    "The junior programs are doing incredible work right now.",
  ],
  'liv-golf': [
    "The lack of major qualification paths is still the biggest issue.",
    "Competition makes everyone better. The PGA Tour needed this push.",
    "I just want to see the best players compete against each other.",
  ],
  'st-andrews': [
    "The Old Course defies logic and I love it for that.",
    "Every hole at Augusta is a painting. Hard to beat aesthetically.",
    "Pine Valley should be in this conversation more often.",
  ],
  default: [
    "Great discussion everyone, really enjoying this one.",
    "This is exactly what this section is for — love it.",
    "Hot take incoming but I think the consensus here is right.",
    "Been thinking about this all week. Solid points all around.",
  ],
}

function getRandomInterval(): number {
  return (10 + Math.random() * 5) * 1000
}

function generateLiveComment(topicId: string): { username: string; text: string } {
  const username = LIVE_USERNAMES[Math.floor(Math.random() * LIVE_USERNAMES.length)]
  const pool = LIVE_COMMENT_POOL[topicId] ?? LIVE_COMMENT_POOL.default
  const text = pool[Math.floor(Math.random() * pool.length)]
  return { username, text }
}

export default function CommentThread({
  topic, comments, currentUser, onBack, onAddComment, onReact,
}: CommentThreadProps) {
  const [inputValue, setInputValue] = useState('')
  const [newIds, setNewIds] = useState<Set<string>>(new Set())
  const listEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleNext = useCallback(() => {
    timerRef.current = setTimeout(() => {
      const { username, text } = generateLiveComment(topic.id)
      onAddComment(topic.id, text, username)
      scheduleNext()
    }, getRandomInterval())
  }, [topic.id, onAddComment])

  useEffect(() => {
    scheduleNext()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [scheduleNext])

  const prevCountRef = useRef(comments.length)
  useEffect(() => {
    if (comments.length > prevCountRef.current) {
      const newest = comments[comments.length - 1]
      setNewIds((prev) => new Set(prev).add(newest.id))
      listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    prevCountRef.current = comments.length
  }, [comments])

  function handleSubmit() {
    const text = inputValue.trim()
    if (!text) return
    onAddComment(topic.id, text, currentUser)
    setInputValue('')
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const canSubmit = inputValue.trim().length > 0

  return (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-4 pt-4 pb-2 border-none bg-transparent cursor-pointer text-sm font-semibold text-[#444] tracking-wide w-fit"
        aria-label="Go back to topic list"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
          <path d="M7 1L1 7l6 6" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        BACK
      </button>

      {/* Topic header */}
      <div className="px-4 pb-0 pt-2">
        <h1 className="text-[22px] font-extrabold text-[#1A1A1A] mb-1">{topic.title}</h1>
        <p className="text-[15px] text-[#555] mb-3.5">{topic.subtitle}</p>
        <div className="h-0.5 bg-gradient-to-r from-[#1B5E35] to-transparent" />
      </div>

      {/* Scrollable comment list */}
      <div className="flex-1 overflow-y-auto px-4" role="feed" aria-label="Comments">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onReact={(commentId, emoji) => onReact(topic.id, commentId, emoji)}
            isNew={newIds.has(comment.id)}
          />
        ))}
        <div ref={listEndRef} />
      </div>

      {/* Comment input */}
      <div className="px-4 pt-3 pb-4 bg-[#EDE9DF] border-t border-[#DDD8CE] flex gap-2.5 items-end">
        <Avatar username={currentUser} size="sm" />
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your comment here"
          rows={1}
          aria-label="Write a comment"
          className="flex-1 px-3.5 py-3 rounded-xl border-[1.5px] border-[#C8C2B4] bg-[#F5F0E8] text-[15px] text-[#1A1A1A] resize-none outline-none font-[inherit] leading-snug focus:border-[#1B5E35] transition-colors duration-150"
        />
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          aria-label="Post comment"
          className={`px-4 h-11 rounded-xl text-sm font-bold text-white shrink-0 transition-colors duration-150
            ${canSubmit ? 'bg-[#1B5E35] cursor-pointer hover:bg-[#164d2b]' : 'bg-[#C8C2B4] cursor-not-allowed'}`}
        >
          Post
        </button>
      </div>
    </div>
  )
}
