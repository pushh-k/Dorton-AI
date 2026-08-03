import "./env.js"
import Redis from "ioredis"

let redisClient
let redisDisabledReason = null

function getRedisClient() {
    if (redisDisabledReason) {
        return null
    }

    if (redisClient) {
        return redisClient
    }

    const host = process.env.REDIS_HOST?.trim()
    const port = process.env.REDIS_PORT?.trim()
    const password = process.env.REDIS_PASSWORD?.trim()

    if (!host || !port) {
        redisDisabledReason = "Redis is not configured"
        return null
    }

    try {
        redisClient = new Redis({
            host,
            port: Number(port),
            password,
            lazyConnect: true,
            maxRetriesPerRequest: 1,
            retryStrategy: () => null,
        })

        redisClient.on("connect", () => {
            console.log("redis conntected")
        })

        redisClient.on("error", (err) => {
            redisDisabledReason = err?.message || "Redis connection failed"
            console.warn(redisDisabledReason)
        })

        return redisClient
    } catch (error) {
        redisDisabledReason = error?.message || "Redis initialization failed"
        console.warn(redisDisabledReason)
        return null
    }
}

async function safeRedisOperation(operation) {
    const client = getRedisClient()

    if (!client) {
        return null
    }

    try {
        return await operation(client)
    } catch (error) {
        redisDisabledReason = error?.message || "Redis operation failed"
        console.warn(redisDisabledReason)
        return null
    }
}

const redis = {
    get(key) {
        return safeRedisOperation((client) => client.get(key))
    },
    set(key, value, ...args) {
        return safeRedisOperation((client) => client.set(key, value, ...args))
    },
    del(key) {
        return safeRedisOperation((client) => client.del(key))
    },
}

export default redis