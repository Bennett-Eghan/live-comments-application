import { useState, useCallback } from 'react'
import { Screen, Tab, Comment, Topic } from './types'
import { TOPICS, SEED_COMMENTS } from './data/seed'
import TopicList from './components/TopicList'
import CommentThread from './components/CommentThread'
import AuthGate from './components/AuthGate'

const CURRENT_USER = 'Tactical'

function initComments(): Record<string, Comment[]> {
  const map: Record<string, Comment[]> = {}
  for (const topic of TOPICS) {
    map[topic.id] = (SEED_COMMENTS[topic.id] ?? []).map((c) => ({ ...c }))
  }
  return map
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [screen, setScreen] = useState<Screen>('topic-list')
  const [activeTab, setActiveTab] = useState<Tab>('conversations')
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [showAuthGate, setShowAuthGate] = useState(false)
  const [pendingTopicId, setPendingTopicId] = useState<string | null>(null)
  const [comments, setComments] = useState<Record<string, Comment[]>>(initComments)

  const handleTopicClick = useCallback((topicId: string) => {
    if (isAuthenticated) {
      setSelectedTopicId(topicId)
      setScreen('comment-thread')
    } else {
      setPendingTopicId(topicId)
      setShowAuthGate(true)
    }
  }, [isAuthenticated])

  const handleSignIn = useCallback(() => {
    setIsAuthenticated(true)
    setShowAuthGate(false)
    if (pendingTopicId) {
      setSelectedTopicId(pendingTopicId)
      setScreen('comment-thread')
      setPendingTopicId(null)
    }
  }, [pendingTopicId])

  const handleBack = useCallback(() => {
    setScreen('topic-list')
  }, [])

  const handleAddComment = useCallback((topicId: string, text: string, username: string) => {
    const newComment: Comment = {
      id: `${Date.now()}-${Math.random()}`,
      username,
      timestamp: new Date(),
      text,
      reactions: [],
    }
    setComments((prev) => ({
      ...prev,
      [topicId]: [...(prev[topicId] ?? []), newComment],
    }))
  }, [])

  const handleReact = useCallback((topicId: string, commentId: string, emoji: string) => {
    setComments((prev) => ({
      ...prev,
      [topicId]: (prev[topicId] ?? []).map((c) => {
        if (c.id !== commentId) return c
        return {
          ...c,
          reactions: c.reactions.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.active ? r.count - 1 : r.count + 1, active: !r.active }
              : r
          ),
        }
      }),
    }))
  }, [])

  const activeTopic: Topic | undefined = TOPICS.find((t) => t.id === selectedTopicId)
  const pendingTopic: Topic | undefined = TOPICS.find((t) => t.id === pendingTopicId)

  return (
    <div className="min-h-dvh bg-[#FFFAED] flex justify-center">
      <div className="w-full max-w-[360px] flex flex-col h-dvh relative bg-[#FFFAED]">
        {screen === 'topic-list' && (
          <TopicList
            topics={TOPICS}
            activeTab={activeTab}
            selectedTopicId={selectedTopicId}
            onTabChange={setActiveTab}
            onTopicClick={handleTopicClick}
          />
        )}

        {screen === 'comment-thread' && activeTopic && (
          <CommentThread
            topic={activeTopic}
            comments={comments[activeTopic.id] ?? []}
            currentUser={CURRENT_USER}
            onBack={handleBack}
            onAddComment={handleAddComment}
            onReact={handleReact}
          />
        )}

        {showAuthGate && pendingTopic && (
          <AuthGate
            topic={pendingTopic}
            onSignIn={handleSignIn}
            onDismiss={() => setShowAuthGate(false)}
          />
        )}
      </div>
    </div>
  )
}
