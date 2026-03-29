import { Comment } from '../types'
import Avatar from './Avatar'

interface CommentCardProps {
  comment: Comment
  onReact: (commentId: string, emoji: string) => void
  isNew?: boolean
}

function formatTime(date: Date): string {
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12 || 12
  return `${hours}:${minutes} ${ampm}`
}

export default function CommentCard({ comment, onReact, isNew = false }: CommentCardProps) {
  return (
    <article
      className={`pt-4 ${isNew ? 'comment-enter' : ''}`}
      aria-label={`Comment by ${comment.username}`}
    >
      <div className="flex items-start gap-3">
        <Avatar username={comment.username} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="font-medium text-[15px] text-black">{comment.username}</span>
            <span className="text-[13px] text-black shrink-0">{formatTime(comment.timestamp)}</span>
          </div>
          <p className="text-[15px] text-black leading-relaxed mb-2.5">{comment.text}</p>
          {comment.reactions.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {comment.reactions.map((reaction) => (
                <button
                  key={reaction.emoji}
                  onClick={() => onReact(comment.id, reaction.emoji)}
                  aria-pressed={reaction.active}
                  aria-label={`${reaction.emoji} ${reaction.count}${reaction.active ? ', you reacted' : ''}`}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm transition-all duration-150 cursor-pointer
                    ${reaction.active
                      ? 'border-[1.5px] border-[#1B5E35] bg-[#EAF4EE] text-[#1B5E35] font-semibold'
                      : 'border-[1.5px] border-[#C8C2B4] bg-transparent text-[#555]'
                    }`}
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
