// src/lib/uploadImage.ts
import { supabase } from './supabaseClient'

export async function uploadImage(file: File, productId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${productId}-${Date.now()}.${fileExt}`

  const { data, error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, file)

  if (uploadError) {
    // serialize it so you can read message and status
    console.error('Upload error details:', JSON.stringify({
      status: uploadError.status,
      message: uploadError.message,
      details: uploadError,
    }, null, 2))
    throw uploadError
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  if (urlError) {
    console.error('Public URL error:', urlError)
    throw urlError
  }

  return publicUrlData.publicUrl
}
