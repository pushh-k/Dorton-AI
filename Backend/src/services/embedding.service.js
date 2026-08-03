import { Mistral } from "@mistralai/mistralai"

let client
let embeddingsDisabled = false

function getClient() {
   if (embeddingsDisabled) {
      return null
   }

   if (client) {
      return client
   }

   const apiKey = process.env.MISTRAL_API?.trim() || process.env.MISTRAL_API_KEY?.trim()

   if (!apiKey) {
      embeddingsDisabled = true
      return null
   }

   client = new Mistral({
      apiKey,
   })

   return client
}

export async function createEmbedding(text){
   const mistralClient = getClient()

   if (!mistralClient) {
      return null
   }

   try{
      const response = await mistralClient.embeddings.create({
         model:"mistral-embed",
         inputs:[text]
      })

      return response.data[0].embedding

   }catch(error){
      embeddingsDisabled = true
      console.warn("Embedding generation disabled:", error?.message || error)
      return null
   }
}