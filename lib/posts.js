import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'blogs')

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       blogId: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       blogId: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => ({
    params: {
      // must match the [param name] in the filename
      blogId: fileName.replace(/\.md$/, ''),
    },
  }))
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
    content: `Now is ${JSON.stringify(process.versions)}`,
  }
}
