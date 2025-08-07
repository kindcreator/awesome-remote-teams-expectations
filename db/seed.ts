import { seed } from 'drizzle-seed'
import { db } from './index'
import { users, expectations } from './schema'
import { sql } from 'drizzle-orm'

async function main() {
  console.log('🌱 Starting database seed...')
  
  try {
    // Clear existing data
    console.log('Clearing existing data...')
    await db.delete(expectations)
    await db.delete(users)
    
    // Reset sequences if needed
    await db.execute(sql`ALTER SEQUENCE IF EXISTS expectations_id_seq RESTART WITH 1`)
    await db.execute(sql`ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1`)
    
    console.log('Seeding database with demo data...')
    
    // Seed with deterministic data for consistency
    await seed(db, { users, expectations }, { seed: 5318008 }).refine((f) => ({
      users: {
        columns: {
          name: f.fullName(),
          email: f.email(),
          clerkUserId: f.string({ 
            isUnique: true,
            template: 'user_{{int.min:100000.max:999999}}' 
          }),
          avatarUrl: f.valuesFromArray({
            values: [
              'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
              'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
              'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
              'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
              'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve',
              'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
              null
            ]
          })
        },
        count: 6,
        with: {
          expectations: {
            columns: {
              title: f.valuesFromArray({
                values: [
                  'Complete API documentation',
                  'Fix authentication bug in production',
                  'Implement new dashboard analytics',
                  'Review and merge pull requests',
                  'Update deployment pipeline',
                  'Refactor user service module',
                  'Write unit tests for payment system',
                  'Design new landing page mockups',
                  'Optimize database queries',
                  'Conduct code review for feature branch',
                  'Setup monitoring and alerting',
                  'Migrate legacy endpoints to v2 API',
                  'Implement caching layer',
                  'Update dependencies to latest versions',
                  'Create onboarding documentation'
                ]
              }),
              createdAt: f.date({ 
                minDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
                maxDate: new Date() 
              }),
              estimatedCompletion: f.date({ 
                minDate: new Date(),
                maxDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
              }),
              isDone: f.weightedRandom([
                { value: true, weight: 0.7 },  // 70% completed
                { value: false, weight: 0.3 }  // 30% active
              ]),
              doneAt: f.default({ defaultValue: null }),
              updatedAt: f.date({ 
                minDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                maxDate: new Date() 
              })
            },
            count: f.int({ minValue: 3, maxValue: 8 }) // Each user has 3-8 expectations (mix of done and active)
          }
        }
      }
    }))
    
    // Create specific demo user for testing (with known credentials)
    const demoUserData = {
      id: 'a0000000-0000-0000-0000-000000000001',
      clerkUserId: 'user_demo_42coffee',
      email: 'demo@42coffee.com',
      name: 'Demo User',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    await db.insert(users).values(demoUserData)
    
    // Add a current active expectation for demo user
    const demoExpectation = {
      id: 'b0000000-0000-0000-0000-000000000001',
      userId: demoUserData.id,
      title: 'Complete test assignment for 42 Coffee Cups',
      createdAt: new Date(),
      estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      isDone: false,
      doneAt: null,
      updatedAt: new Date()
    }
    
    await db.insert(expectations).values(demoExpectation)
    
    // Add some completed expectations for demo user
    const completedExpectations = [
      {
        userId: demoUserData.id,
        title: 'Setup development environment',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isDone: true,
        doneAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        userId: demoUserData.id,
        title: 'Review project documentation',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        estimatedCompletion: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        isDone: true,
        doneAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)
      }
    ]
    
    await db.insert(expectations).values(completedExpectations)
    
    console.log('✅ Database seeded successfully!')
    console.log('📧 Demo user credentials:')
    console.log('   Email: demo@42coffee.com')
    console.log('   Clerk User ID: user_demo_42coffee')
    
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

main()