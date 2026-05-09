
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export function rateLimit(key: string, limit: number = 10, windowMs: number) {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + windowMs }); // create new entry
        return { success: true, remaining: limit - 1 };
    };
    if (record.count >= limit) {
        return {
            success: false,
            remaining: 0,
            resetTime: record.resetTime
        };
    };

    // when record exists and under the limit
    record.count++;
    return { success: true, remaining: limit - record.count };
};