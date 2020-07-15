import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Loading from './Loading'

const Home = React.lazy(() => import('./Home'))
const Players = React.lazy(() => import('./Players'))
const Teams = React.lazy(() => import('./Teams'))
const TeamPage = React.lazy(() => import('./TeamPage'))
const Article = React.lazy(() => import('./Article'))

export default function App () {
  return (
    <Router>
      <div>
        <Nav />

        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/players'>
              <Players />
            </Route>
            <Route path='/teams'>
              <Teams />
            </Route>
            <Route exact path='/:teamId'>
              <TeamPage />
            </Route>
            <Route path='/:teamId/articles'>
              <Article />
            </Route>
            <Route path='*'>
              <h1 className='text-center'>Four oh Four</h1>
            </Route>
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  )
}