import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'

import utilStyles from '../../styles/utils.module.css'
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div>{postData.content}</div>
      </article>
    </Layout>
  )
}
export async function getStaticPaths() {
  // so that the site knows when to throw a 404 error
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps({ params }) {
  const postData = getPostData(params.blogId)
  return {
    props: {
      postData,
    },
  }
}
