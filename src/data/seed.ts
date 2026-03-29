import { Topic, Comment } from '../types'

export const TOPICS: Topic[] = [
  // Conversations
  { id: 'rory', title: 'Rory McIlroy: deep dive', subtitle: 'Is time running out for Rory at the Majors?', tab: 'conversations' },
  { id: 'nicklaus-woods', title: 'Nicklaus vs. Woods', subtitle: 'Can we ever truly crown a golfing GOAT?', tab: 'conversations' },
  { id: 'state-of-game', title: 'The State of the Game', subtitle: 'Is golf growing or facing new challenges?', tab: 'conversations' },
  { id: 'liv-golf', title: 'LIV Golf: The Impact', subtitle: 'Has it fundamentally changed professional golf?', tab: 'conversations' },
  { id: 'st-andrews', title: 'St Andrews and beyond', subtitle: 'What makes a great golf course?', tab: 'conversations' },
  // Games
  { id: 'masters-preview', title: 'Masters Preview', subtitle: 'Who takes Augusta this year?', tab: 'games' },
  { id: 'pga-championship', title: 'PGA Championship', subtitle: 'Can anyone stop Scottie Scheffler?', tab: 'games' },
  // News
  { id: 'tour-merger', title: 'Tour Merger Update', subtitle: 'Where do negotiations stand now?', tab: 'news' },
  { id: 'tiger-return', title: 'Tiger Watch', subtitle: 'Is a competitive return realistic?', tab: 'news' },
  // Stats
  { id: 'strokes-gained', title: 'Strokes Gained Deep Dive', subtitle: 'The stat that changed how we watch golf', tab: 'stats' },
  { id: 'driving-distance', title: 'Distance vs. Accuracy', subtitle: 'Does hitting it far still win majors?', tab: 'stats' },
]

function makeDate(hoursAgo: number): Date {
  return new Date(Date.now() - hoursAgo * 60 * 60 * 1000)
}

export const SEED_COMMENTS: Record<string, Comment[]> = {
  rory: [
    {
      id: 'c1',
      username: 'GolfFanatic_78',
      timestamp: makeDate(2),
      text: "It's gotta happen soon, right? 🤔 He's too talented to only have 4. But the competition is just so deep now...",
      reactions: [
        { emoji: '👍', count: 35, active: false },
        { emoji: '💯', count: 35, active: false },
      ],
    },
    {
      id: 'c2',
      username: 'Roryloyalist',
      timestamp: makeDate(3),
      text: "Pressure, maybe? The weight of expectation has to be immense. Everyone's always talking about him winning another major 😏",
      reactions: [],
    },
    {
      id: 'c3',
      username: 'MajorMadness',
      timestamp: makeDate(4),
      text: "That Open Championship at Hoylake in '14 feels like ages ago. He looked unstoppable then, what changed? 😭😭😭",
      reactions: [
        { emoji: '👍', count: 35, active: false },
        { emoji: '❤️', count: 35, active: false },
        { emoji: '👏', count: 35, active: false },
      ],
    },
    {
      id: 'c4',
      username: 'Analytical_Golfer',
      timestamp: makeDate(5),
      text: "Statistically, his approach play still ranks high, but his putting in the majors lately has been... 😬 you can't afford that against the best",
      reactions: [],
    },
  ],
  'nicklaus-woods': [
    {
      id: 'nw1',
      username: 'BearFan1960',
      timestamp: makeDate(1),
      text: "18 majors. End of discussion. Nicklaus played in an era where every single player was gunning for him and still dominated.",
      reactions: [
        { emoji: '👍', count: 41, active: false },
        { emoji: '💯', count: 18, active: false },
      ],
    },
    {
      id: 'nw2',
      username: 'TigerEra_Dave',
      timestamp: makeDate(2),
      text: "Tiger transformed the game physically and mentally. Every player today trains differently because of him. That impact is priceless.",
      reactions: [
        { emoji: '❤️', count: 29, active: false },
        { emoji: '👏', count: 12, active: false },
      ],
    },
    {
      id: 'nw3',
      username: 'GolfHistorian',
      timestamp: makeDate(3),
      text: "You have to account for field depth. The global talent pool in Tiger's era was enormous. Nicklaus faced great players but not 200 of them.",
      reactions: [
        { emoji: '👍', count: 22, active: false },
      ],
    },
  ],
  'state-of-game': [
    {
      id: 'sg1',
      username: 'CourseMarshal',
      timestamp: makeDate(1),
      text: "Participation numbers are up since COVID. People discovered golf and stuck with it. The sport is healthier than the discourse suggests.",
      reactions: [
        { emoji: '👍', count: 19, active: false },
        { emoji: '💯', count: 8, active: false },
      ],
    },
    {
      id: 'sg2',
      username: 'GreenFeeGripe',
      timestamp: makeDate(2),
      text: "Cost is the real barrier. Green fees have gone through the roof. You're looking at $150+ for a decent round now. How is that growing the game?",
      reactions: [
        { emoji: '💯', count: 44, active: false },
        { emoji: '❤️', count: 11, active: false },
      ],
    },
    {
      id: 'sg3',
      username: 'TechGolfer99',
      timestamp: makeDate(4),
      text: "Topgolf and simulators brought in people who'd never touched a club. That's a huge pipeline for the real game.",
      reactions: [
        { emoji: '👍', count: 16, active: false },
      ],
    },
  ],
  'liv-golf': [
    {
      id: 'lg1',
      username: 'TraditionalFan',
      timestamp: makeDate(1),
      text: "LIV fractured something that took decades to build. The Ryder Cup selections alone have been a nightmare.",
      reactions: [
        { emoji: '👍', count: 27, active: false },
        { emoji: '💯', count: 14, active: false },
      ],
    },
    {
      id: 'lg2',
      username: 'MoneyTalks_Golf',
      timestamp: makeDate(2),
      text: "Can't blame the players for taking guaranteed money. The PGA Tour was never going to share revenue properly.",
      reactions: [
        { emoji: '💯', count: 33, active: false },
        { emoji: '👏', count: 9, active: false },
      ],
    },
    {
      id: 'lg3',
      username: 'NeutralObserver',
      timestamp: makeDate(3),
      text: "The product itself is fine but nobody watches it. Viewership numbers don't lie. LIV needed major recognition to survive.",
      reactions: [
        { emoji: '👍', count: 21, active: false },
      ],
    },
  ],
  'st-andrews': [
    {
      id: 'sa1',
      username: 'Links_Lover',
      timestamp: makeDate(1),
      text: "St Andrews is golf in its purest form. The wind, the humps, the Road Hole bunker — every hole tells a story 300 years in the making.",
      reactions: [
        { emoji: '❤️', count: 52, active: false },
        { emoji: '👏', count: 28, active: false },
      ],
    },
    {
      id: 'sa2',
      username: 'Augusta_Army',
      timestamp: makeDate(2),
      text: "Aesthetics matter and Augusta wins there. St Andrews is historic but it's not exactly pretty to look at on TV.",
      reactions: [
        { emoji: '👍', count: 17, active: false },
        { emoji: '💯', count: 9, active: false },
      ],
    },
    {
      id: 'sa3',
      username: 'CourseArchitect_J',
      timestamp: makeDate(3),
      text: "A great course makes every club in your bag relevant. St Andrews, Carnoustie, Muirfield — they all pass that test.",
      reactions: [
        { emoji: '👍', count: 31, active: false },
        { emoji: '❤️', count: 14, active: false },
      ],
    },
  ],
  'masters-preview': [
    {
      id: 'mp1',
      username: 'ScottieWatch',
      timestamp: makeDate(1),
      text: "Scheffler is just playing a different game right now. Augusta suits his ball-striking perfectly.",
      reactions: [
        { emoji: '👍', count: 38, active: false },
        { emoji: '💯', count: 22, active: false },
      ],
    },
    {
      id: 'mp2',
      username: 'UnderdogPick',
      timestamp: makeDate(2),
      text: "Give me Xander Schauffele. He's been knocking on the door at majors for years and Augusta fits his fade.",
      reactions: [
        { emoji: '👍', count: 15, active: false },
      ],
    },
    {
      id: 'mp3',
      username: 'WeatherWatcher',
      timestamp: makeDate(3),
      text: "Nobody's talking about course conditions. If Augusta plays soft, birdies get easier and the tournament opens up.",
      reactions: [
        { emoji: '💯', count: 19, active: false },
        { emoji: '👏', count: 7, active: false },
      ],
    },
  ],
  'pga-championship': [
    {
      id: 'pg1',
      username: 'PGAhistory',
      timestamp: makeDate(1),
      text: "Valhalla last year was spectacular. A tough track that separated ball-strikers from the field.",
      reactions: [
        { emoji: '👍', count: 24, active: false },
        { emoji: '❤️', count: 11, active: false },
      ],
    },
    {
      id: 'pg2',
      username: 'DrivingRangeRob',
      timestamp: makeDate(2),
      text: "PGA Championship gets overlooked compared to the Masters and Open. It deserves more respect in the major conversation.",
      reactions: [
        { emoji: '💯', count: 36, active: false },
        { emoji: '👏', count: 18, active: false },
      ],
    },
  ],
  'tour-merger': [
    {
      id: 'tm1',
      username: 'InsiderAccess',
      timestamp: makeDate(1),
      text: "These negotiations have been going on for over a year. At some point the players need certainty.",
      reactions: [
        { emoji: '👍', count: 29, active: false },
        { emoji: '💯', count: 17, active: false },
      ],
    },
    {
      id: 'tm2',
      username: 'FanZone_Regular',
      timestamp: makeDate(2),
      text: "I just want the best players competing together. That's it. Whatever deal gets that done, I'm for it.",
      reactions: [
        { emoji: '💯', count: 48, active: false },
        { emoji: '❤️', count: 23, active: false },
        { emoji: '👏', count: 15, active: false },
      ],
    },
  ],
  'tiger-return': [
    {
      id: 'tr1',
      username: 'TigerBeliever',
      timestamp: makeDate(1),
      text: "If his body holds up, never count Tiger out. We've said he's done before and he came back to win the Masters.",
      reactions: [
        { emoji: '👍', count: 61, active: false },
        { emoji: '❤️', count: 34, active: false },
      ],
    },
    {
      id: 'tr2',
      username: 'RealistGolfer',
      timestamp: makeDate(3),
      text: "The ankle surgery was serious. Even competing at 50% of his best isn't realistic now. His legacy is secure, let him be.",
      reactions: [
        { emoji: '💯', count: 25, active: false },
      ],
    },
  ],
  'strokes-gained': [
    {
      id: 'sgs1',
      username: 'DataNerd_Golf',
      timestamp: makeDate(1),
      text: "Strokes gained revolutionized how we understand performance. You can finally quantify what a 40-foot par save is actually worth.",
      reactions: [
        { emoji: '👍', count: 33, active: false },
        { emoji: '💯', count: 21, active: false },
      ],
    },
    {
      id: 'sgs2',
      username: 'OldSchool_Pro',
      timestamp: makeDate(2),
      text: "Stats are fine but they can't measure the mentality of holding a putt on the 72nd hole. Golf is still human.",
      reactions: [
        { emoji: '❤️', count: 29, active: false },
        { emoji: '👏', count: 13, active: false },
      ],
    },
  ],
  'driving-distance': [
    {
      id: 'dd1',
      username: 'LongDriveLou',
      timestamp: makeDate(1),
      text: "Distance is the great democratiser. A 350-yard drive makes every hole shorter and every approach easier. It absolutely wins majors.",
      reactions: [
        { emoji: '👍', count: 27, active: false },
        { emoji: '💯', count: 14, active: false },
      ],
    },
    {
      id: 'dd2',
      username: 'IronByron',
      timestamp: makeDate(2),
      text: "Look at the major winners over 10 years. Plenty of mid-distance players on that list. It's approach play and putting that decide majors.",
      reactions: [
        { emoji: '💯', count: 31, active: false },
        { emoji: '👍', count: 18, active: false },
        { emoji: '❤️', count: 9, active: false },
      ],
    },
  ],
}
