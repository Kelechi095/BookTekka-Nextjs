import {User} from 'prisma/prisma-client'

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string
    updatedAt: string
    emailVerified: string | null
} 