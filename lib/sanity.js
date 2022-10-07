import {
  createClient,
  createPreviewSubscriptionHook,
} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn:
    typeof document !== 'undefined' && process.env.NODE_ENV === 'production',
  apiVersion: '2022-03-13',
}

export const imageBuilder = source => createImageUrlBuilder(config).image(source)
export const usePreviewSubscription = createPreviewSubscriptionHook(config)
export const client = createClient(config)
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (usePreview) => (usePreview ? previewClient : client)
export default client