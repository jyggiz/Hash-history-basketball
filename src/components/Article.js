import * as React from 'react'
import { useParams, useRouteMatch, Route, Switch } from 'react-router-dom'

import useTeamsArticles from '../hooks/useTeamsArticles'
import useArticle from '../hooks/useArticle'
import Loading from './Loading'
import Sidebar from './Sidebar'

export default function Article () {
  const { teamId } = useParams()
  const { response: articles, loading } = useTeamsArticles(teamId)
  const { path } = useRouteMatch()

  if (loading) {
    return <Loading />
  }

  return (
    <div className='container two-column'>
      <Sidebar 
        title='Articles'
        list={articles.map(a => a.title)}
      />
      <Switch>
      <Route path={`${path}/:articleId`}>
        <ArticleItem articles={articles}/>
      </Route>
      <Route path='*'>
        <div className='sidebar-instruction'>
          Select an Article
        </div>
      </Route>
      </Switch>
    </div>
  )
}

function ArticleItem () {
  const { teamId, articleId } = useParams()
  const { response, loading } = useArticle({teamId, articleId: articleId})

  if (loading) {
    return <Loading />
  }

  const { title, body } = response

  return (
    <div className='panel'>
      <article className='article'>
        <h1 className='header'>{title}</h1>
        <p>{body}</p>
      </article>
    </div>
  )
}