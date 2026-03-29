export type Tab = 'conversations' | 'games' | 'news' | 'stats'
export type Screen = 'topic-list' | 'comment-thread'

export interface Reaction {
  emoji: string
  count: number
  active: boolean
}

export interface Comment {
  id: string
  username: string
  timestamp: Date
  text: string
  reactions: Reaction[]
}

export interface Topic {
  id: string
  title: string
  subtitle: string
  tab: Tab
}
