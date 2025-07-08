

'use client'
import { useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export default function PhotoUpload({ onUpload }: { onUpload: (urls: string[]) => void }) {
  const [isUploading, setIsUploading] = useState(false)
  const storage = getStorage()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    const urls: string[] = []
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const storageRef = ref(storage, `providers/${uuidv4()}`)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        urls.push(url)
      }
      onUpload(urls)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Service Photos {isUploading && '(Uploading...)'}
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      <p className="text-xs text-gray-500">Upload high-quality photos of your work</p>
    </div>
  )
}

