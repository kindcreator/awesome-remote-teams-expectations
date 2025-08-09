import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export interface CreateUserDto {
  clerkUserId: string
  name?: string | null
  email?: string | null
  avatarUrl?: string | null
}

export interface UpdateUserDto {
  name?: string | null
  email?: string | null
  avatarUrl?: string | null
}

export class UsersService {
  async getByClerkId(clerkUserId: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1)
    
    return user || null
  }

  async getById(userId: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
    
    return user || null
  }

  async create(data: CreateUserDto) {
    const [newUser] = await db
      .insert(users)
      .values({
        clerkUserId: data.clerkUserId,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning()
    
    return newUser
  }

  async update(userId: string, data: UpdateUserDto) {
    // Note: This should only be called by webhook handlers
    // User updates should come from Clerk -> webhook -> this method
    const updateData: any = { updatedAt: new Date() }
    
    if (data.name !== undefined) {
      updateData.name = data.name
    }
    if (data.email !== undefined) {
      updateData.email = data.email
    }
    if (data.avatarUrl !== undefined) {
      updateData.avatarUrl = data.avatarUrl
    }

    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning()
    
    return updated || null
  }

  async delete(userId: string) {
    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning()
    
    return deleted || null
  }

  async exists(clerkUserId: string): Promise<boolean> {
    const [result] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1)
    
    return !!result
  }
}

export const usersService = new UsersService()