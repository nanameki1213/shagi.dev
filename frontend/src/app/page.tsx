import { fetchPosts } from '@/app/lib/api'
import PostList from '@/app/components/PostList'

export default async function Home() {
  const posts = await fetchPosts()
  return <PostList posts={posts} />
}
