import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs: 60 * 1000,
	limit: 5,
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
	ipv6Subnet: 56,
	message : 'Request Limit Reached try again after sometime'
})

