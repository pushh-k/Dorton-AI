import "../config/env.js"
import ImageKit, { toFile } from "@imagekit/nodejs"

let imagekit

function getImageKitClient() {
  if (imagekit) {
    return imagekit
  }

  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY?.trim()
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim()
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT?.trim()

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error(
      "ImageKit is not configured. Set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT in the root .env file."
    )
  }

  imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  })

  return imagekit
}

/**
 * Upload a file buffer to ImageKit.
 * @param {Buffer} buffer       - File buffer from multer memoryStorage
 * @param {string} fileName     - Original file name
 * @param {string} folder       - ImageKit folder path (e.g. "/chats/images")
 * @returns {{ url: string, fileId: string }}
 */
export async function uploadToImageKit(buffer, fileName, folder = "/uploads") {
  const sanitizedName = `${Date.now()}-${fileName.replace(/\s+/g, "_")}`
  const client = getImageKitClient()

  const response = await client.files.upload({
    file: await toFile(buffer, sanitizedName),
    fileName: sanitizedName,
    folder,
    useUniqueFileName: false, // we already prefix with timestamp
  })

  return {
    url: response.url,
    fileId: response.fileId,
  }
}
