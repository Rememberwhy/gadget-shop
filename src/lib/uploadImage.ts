import { supabase } from './supabaseClient'

export async function uploadImage(file: File, filename: string): Promise<string> {
  const { data, error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filename, file, { upsert: true })

  if (uploadError) {
    console.error('Upload error details:', JSON.stringify({
      message: uploadError.message,
      details: uploadError,
    }, null, 2))
    throw new Error('Image upload failed')
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${filename}`
  return url
}
