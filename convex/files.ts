import { ConvexError, v } from 'convex/values'
import { MutationCtx, QueryCtx, mutation, query } from './_generated/server'
import { getUser } from './users'

async function hasAccessToOrg(
    ctx: QueryCtx | MutationCtx, 
    tokenIdentifier: string, 
    orgsId: string
) {
    const user = await getUser(ctx, tokenIdentifier)

    const hasAccess = user.orgsId.includes(orgsId) || user.tokenIdentifier.includes(orgsId)

    return hasAccess
}

export const createFile = mutation({
    args: {
        name: v.string(),
        orgsId: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity) {
            throw new ConvexError("you must be logged in to upload a file")
        }

        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgsId)

        if(!hasAccess) {
            throw new ConvexError('No Access to the organization')
        }

        await ctx.db.insert('files', {
            name: args.name,
            orgId: args.orgsId
        })
    }
})

export const getFile = query({
    args: {
        orgsId: v.string()
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity()

        if(!identity) {
            return []
        }

        const hasAccess = await hasAccessToOrg(ctx, identity.tokenIdentifier, args.orgsId)

        if(!hasAccess) {
            return []
        }

        return await ctx.db.query('files').withIndex('by_orgId', q => 
            q.eq('orgId', args.orgsId)
        ).collect()
    }
})