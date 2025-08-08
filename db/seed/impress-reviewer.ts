import { db } from '../index'
import { users, expectations } from '../schema'
import { clearDatabase, createExpectation, DAYS_IN_MS } from './common'

// Avatar URLs from environment variables (for security)
const YAROSLAV_AVATARS = [
  process.env.YAROSLAV_AVATAR_1 || '',
  process.env.YAROSLAV_AVATAR_2 || '',
  process.env.YAROSLAV_AVATAR_3 || '',
]

const AKHAVR_AVATAR = process.env.AKHAVR_AVATAR || ''

// Project history for Yaroslav's team at 42 Coffee Cups
const YAROSLAV_EXPECTATIONS = [
  // Strategic/CTO tasks - completed
  { title: 'Review MVP architecture for new client startup', isDone: true, daysAgo: 21, assignTo: 'yaroslav' },
  { title: 'Define tech stack: Next.js, TypeScript, Supabase for scalability', isDone: true, daysAgo: 19, assignTo: 'yaroslav' },
  { title: 'Set up CI/CD pipeline with Vercel and GitHub Actions', isDone: true, daysAgo: 17, assignTo: 'reviewer' },
  { title: 'Establish code review process and quality standards', isDone: true, daysAgo: 16, assignTo: 'yaroslav' },
  
  // Test task evaluation for new developer (Ticket 1)
  { title: 'Review candidate Next.js/TypeScript bootstrap implementation', isDone: true, daysAgo: 14, assignTo: 'yaroslav' },
  { title: 'Evaluate Tailwind CSS and component architecture choices', isDone: true, daysAgo: 13, assignTo: 'not-yaroslav' },
  { title: 'Assess landing page code quality and responsiveness', isDone: true, daysAgo: 12, assignTo: 'reviewer' },
  
  // Authentication architecture review (Ticket 2)
  { title: 'Validate Clerk integration approach and security', isDone: true, daysAgo: 8, assignTo: 'yaroslav' },
  { title: 'Review Supabase RLS policies and database design', isDone: true, daysAgo: 7, assignTo: 'reviewer' },
  { title: 'Assess Drizzle ORM implementation patterns', isDone: true, daysAgo: 6, assignTo: 'yaroslav' },
  { title: 'Check session management and middleware architecture', isDone: true, daysAgo: 5, assignTo: 'not-yaroslav' },
  
  // Current sprint - Dashboard implementation review (Ticket 3)
  { title: 'Review dashboard component architecture and state management', isDone: true, daysAgo: 3, assignTo: 'yaroslav' },
  { title: 'Evaluate CRUD operations and API design', isDone: true, daysAgo: 2, assignTo: 'not-yaroslav' },
  { title: 'Deploy staging environment on Vercel for client demo', isDone: false, daysFromNow: 1, assignTo: 'reviewer' },
  { title: 'Conduct final code review and performance audit', isDone: false, daysFromNow: 3, assignTo: 'yaroslav' },
  { title: 'Prepare hiring recommendation based on test task', isDone: false, daysFromNow: 5, assignTo: 'yaroslav' },
  { title: 'Schedule technical interview with candidate', isDone: false, daysFromNow: 7, assignTo: 'not-yaroslav' },
]

// Networking/referral tasks for akhavr (Quantum Wiring / DeSci enthusiast)
const AKHAVR_EXPECTATIONS = [
  { title: 'Research decentralized governance models for DeSci project', isDone: true, daysAgo: 25 },
  { title: 'Design nanobot network architecture specs', isDone: true, daysAgo: 22 },
  { title: 'Review CV and connect talent for longevity tech startup', isDone: true, daysAgo: 20 },
  { title: 'Connect candidate with Yaroslav at 42cc', isDone: true, daysAgo: 18 },
  { title: 'Prototype quantum computing interface for biomarker analysis', isDone: true, daysAgo: 10 },
  { title: 'Implement blockchain-based research data sharing protocol', isDone: true, daysAgo: 5 },
  { title: 'Be awesome (as always)', isDone: true, daysAgo: 1 },
]

export async function seedImpressReviewer() {
  await clearDatabase()
  
  console.log('🎯 Seeding review team with networking chain...')
  
  // Create the networking chain: akhavr -> Yaroslav -> 42 Coffee Cups team
  const teamMembers = [
    {
      name: 'akhavr (Anarchist)',
      email: 'akhavr@network.dev',
      clerkUserId: 'user_akhavr_000',
      avatarUrl: AKHAVR_AVATAR || 'https://api.dicebear.com/7.x/avataaars/svg?seed=akhavr'
    },
    {
      name: 'TotallyNotEvilTwit Luzin (CTO)',
      email: 'yaroslav@42coffeecups.com',
      clerkUserId: 'user_yaroslav_001',
      avatarUrl: YAROSLAV_AVATARS[0] || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yaroslav'
    },
    {
      name: 'Nizul (Tech Lead)',
      email: 'tech.lead@42coffeecups.com',
      clerkUserId: 'user_techlead_002',
      avatarUrl: YAROSLAV_AVATARS[1] || 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechLead'
    },
    {
      name: 'Yaroslav L. (Senior Dev)',
      email: 'senior.dev@42coffeecups.com',
      clerkUserId: 'user_senior_003',
      avatarUrl: YAROSLAV_AVATARS[2] || 'https://api.dicebear.com/7.x/avataaars/svg?seed=SeniorDev'
    }
  ]
  
  // Insert team members
  const insertedUsers = await db.insert(users).values(
    teamMembers.map(member => ({
      ...member,
      createdAt: new Date(Date.now() - 30 * DAYS_IN_MS),
      updatedAt: new Date()
    }))
  ).returning()
  
  console.log(`Created ${insertedUsers.length} team members`)
  
  // Prepare expectations
  const allExpectations = []
  
  // Find team members for task assignment
  const akhavr = insertedUsers.find(u => u.name.includes('akhavr'))
  const yaroslav = insertedUsers.find(u => u.name.includes('(CTO)'))
  const techLead = insertedUsers.find(u => u.name.includes('(Tech Lead)'))
  const seniorDev = insertedUsers.find(u => u.name.includes('(Senior Dev)'))
  
  // Add akhavr's networking expectations
  if (akhavr) {
    AKHAVR_EXPECTATIONS.forEach(exp => {
      allExpectations.push(createExpectation(
        akhavr.id,
        exp.title,
        {
          daysAgo: exp.daysAgo,
          isDone: exp.isDone
        }
      ))
    })
  }
  
  // Track which users have active expectations (only one allowed per user)
  const usersWithActiveExpectations = new Set()
  
  // Add project expectations for Yaroslav's team
  YAROSLAV_EXPECTATIONS.forEach(exp => {
    let userId
    switch(exp.assignTo) {
      case 'yaroslav':
        userId = yaroslav?.id
        break
      case 'not-yaroslav':
        userId = techLead?.id
        break
      case 'reviewer':
        userId = seniorDev?.id
        break
      default:
        userId = yaroslav?.id
    }
    
    if (!userId) return
    
    // Enforce one active expectation per user constraint
    let isDone = exp.isDone !== undefined ? exp.isDone : true
    if (!isDone) {
      if (usersWithActiveExpectations.has(userId)) {
        // User already has an active expectation, mark this one as done
        isDone = true
      } else {
        usersWithActiveExpectations.add(userId)
      }
    }
    
    allExpectations.push(createExpectation(
      userId,
      exp.title,
      {
        daysAgo: exp.daysAgo,
        daysFromNow: exp.daysFromNow,
        isDone
      }
    ))
  })
  
  // Batch insert all expectations
  if (allExpectations.length > 0) {
    await db.insert(expectations).values(allExpectations)
    console.log(`Added ${allExpectations.length} project expectations`)
  }
  
  console.log('✨ Yaroslav\'s team ready for review!')
  return insertedUsers
}