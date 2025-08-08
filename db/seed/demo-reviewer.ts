import { db } from '../index'
import { users, expectations } from '../schema'
import { clearDatabase, createExpectation, DAYS_IN_MS } from './common'
import { ensureDemoUser } from './ensure-demo-user'

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
  
  // ACTIVE TASKS - One for each team member
  { title: 'Deploy staging environment on Vercel for client demo', isDone: false, daysFromNow: 1, assignTo: 'reviewer' },
  { title: 'Conduct final code review and performance audit', isDone: false, daysFromNow: 3, assignTo: 'yaroslav' },
  { title: 'Prepare hiring recommendation based on test task', isDone: false, daysFromNow: 5, assignTo: 'not-yaroslav' },
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
  // Active task for akhavr
  { title: 'Evaluate Web3 integration for decentralized science platform', isDone: false, daysFromNow: 4 },
]

export async function seedDemoReviewer() {
  await clearDatabase()
  
  console.log('🎯 Seeding review team with networking chain...')
  
  // Ensure the demo/E2E user exists (after clearing)
  const demoUser = await ensureDemoUser()
  
  // Add an active expectation for the demo user if they exist
  if (demoUser) {
    const demoExpectation = createExpectation(
      demoUser.id,
      'Complete product demo and gather feedback',
      {
        daysFromNow: 2,
        isDone: false
      }
    )
    await db.insert(expectations).values(demoExpectation)
    console.log('✅ Added active expectation for demo user')
  }
  
  // Create the networking chain: akhavr -> Yaroslav -> 42 Coffee Cups team
  const teamMembers = [
    {
      name: 'akhavr (Anarchist 🔪)',
      email: 'akhavr@network.dev',
      clerkUserId: 'user_akhavr_000',
      avatarUrl: AKHAVR_AVATAR || 'https://api.dicebear.com/7.x/lorelei/svg?seed=akhavr'
    },
    {
      name: 'TotallyNotEvilTwit Luzin (😈)',
      email: 'yaroslav@42coffeecups.com',
      clerkUserId: 'user_yaroslav_001',
      avatarUrl: YAROSLAV_AVATARS[0] || 'https://api.dicebear.com/7.x/lorelei/svg?seed=Yaroslav'
    },
    {
      name: 'Nizul (Tech Lead 🧠 )',
      email: 'tech.lead@42coffeecups.com',
      clerkUserId: 'user_techlead_002',
      avatarUrl: YAROSLAV_AVATARS[1] || 'https://api.dicebear.com/7.x/lorelei/svg?seed=TechLead'
    },
    {
      name: 'Yaroslav L. (Senior Dev 🤓)',
      email: 'senior.dev@42coffeecups.com',
      clerkUserId: 'user_senior_003',
      avatarUrl: YAROSLAV_AVATARS[2] || 'https://api.dicebear.com/7.x/lorelei/svg?seed=SeniorDev'
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
  const yaroslav = insertedUsers.find(u => u.name.includes('TotallyNotEvilTwit'))
  const techLead = insertedUsers.find(u => u.name.includes('Tech Lead'))
  const seniorDev = insertedUsers.find(u => u.name.includes('Senior Dev'))
  
  console.log('User mapping:', {
    akhavr: akhavr?.name,
    yaroslav: yaroslav?.name,
    techLead: techLead?.name,
    seniorDev: seniorDev?.name
  })
  
  // Add akhavr's networking expectations - use hardcoded values directly
  if (akhavr) {
    AKHAVR_EXPECTATIONS.forEach(exp => {
      allExpectations.push(createExpectation(
        akhavr.id,
        exp.title,
        {
          daysAgo: exp.daysAgo,
          daysFromNow: exp.daysFromNow,
          isDone: exp.isDone !== undefined ? exp.isDone : true
        }
      ))
    })
  }
  
  // Add project expectations for Yaroslav's team - use hardcoded values directly
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
    
    allExpectations.push(createExpectation(
      userId,
      exp.title,
      {
        daysAgo: exp.daysAgo,
        daysFromNow: exp.daysFromNow,
        isDone: exp.isDone !== undefined ? exp.isDone : true
      }
    ))
  })
  
  // Batch insert all expectations
  if (allExpectations.length > 0) {
    await db.insert(expectations).values(allExpectations)
    console.log(`Added ${allExpectations.length} project expectations`)
  }
  
  // Log summary of active expectations per user
  console.log('\n📊 Active expectations summary:')
  const allUsers = demoUser ? [demoUser, ...insertedUsers] : insertedUsers
  
  // Debug: Show all active expectations
  console.log('\nActive tasks being created:')
  allExpectations.filter(e => !e.isDone).forEach(e => {
    const user = allUsers.find(u => u.id === e.userId)
    console.log(`  - ${user?.name}: "${e.title}"`)
  })
  
  // Count active per user
  for (const user of allUsers) {
    const userActiveExpectations = allExpectations.filter(e => e.userId === user.id && !e.isDone)
    const demoActiveCount = demoUser?.id === user.id ? 1 : 0
    const totalActive = userActiveExpectations.length + demoActiveCount
    console.log(`   ${user.name}: ${totalActive} active expectation(s)`)
  }
  
  console.log('✨ Yaroslav\'s team ready for review!')
  return insertedUsers
}