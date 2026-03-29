import { useRef, useState } from 'react'
import { Topic, Comment } from '../types'
import CommentCard from './CommentCard'

interface CommentThreadProps {
  topic: Topic
  comments: Comment[]
  currentUser: string
  onBack: () => void
  onAddComment: (topicId: string, text: string, username: string) => void
  onReact: (topicId: string, commentId: string, emoji: string) => void
}

const GRADIENT_LINE = {
  height: 1,
  background: 'linear-gradient(to right, #006824 0%, #FFDF75 100%)',
}

export default function CommentThread({
  topic, comments, currentUser, onBack, onAddComment, onReact,
}: CommentThreadProps) {
  const [inputValue, setInputValue] = useState('')
  const listEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  function handleSubmit() {
    const text = inputValue.trim()
    if (!text) return
    onAddComment(topic.id, text, currentUser)
    setInputValue('')
    inputRef.current?.focus()
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-4 pt-4 pb-2 border-none bg-transparent cursor-pointer text-sm text-black tracking-wide w-fit"
        aria-label="Go back to topic list"
      >
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
          <path d="M7 1L1 7l6 6" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        BACK
      </button>

      {/* Topic header */}
      <div className="px-4 pb-0 pt-2">
        <h1 className="text-[22px] font-extrabold text-[#1A1A1A] mb-1">{topic.title}</h1>
        <p className="text-[15px] text-black mb-3.5">{topic.subtitle}</p>
        <div style={GRADIENT_LINE} />
      </div>

      {/* Scrollable comment list */}
      <div className="flex-1 overflow-y-auto px-4" role="feed" aria-label="Comments">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onReact={(commentId, emoji) => onReact(topic.id, commentId, emoji)}
            isNew={false}
          />
        ))}
        <div ref={listEndRef} />
      </div>

      {/* Gradient divider above input */}
      <div style={GRADIENT_LINE} />

      {/* Comment input — Enter to post, no avatar or button */}
      <div
        className="bg-[#F5EAD3] m-3 rounded-xl flex items-center cursor-text"
        style={{ minHeight: 56 }}
        onClick={() => inputRef.current?.focus()}
      >
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your comment here"
          rows={1}
          aria-label="Write a comment"
          className="w-full px-4 bg-transparent text-[15px] text-black placeholder-black resize-none outline-none leading-snug border-none cursor-text"
        />
      </div>
    </div>
  )
}
