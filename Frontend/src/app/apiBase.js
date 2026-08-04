const rawApiBaseUrl = typeof import.meta !== "undefined" && import.meta.env
	? import.meta.env.VITE_API_URL?.trim()
	: undefined

const fallbackApiBaseUrl = "https://dortonai-by-pushkar.onrender.com"

export const API_BASE_URL = (rawApiBaseUrl || fallbackApiBaseUrl).replace(/\/$/, "")
