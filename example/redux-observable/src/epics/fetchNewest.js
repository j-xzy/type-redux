import { map, mergeMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable'

const fetchNewest = action$ =>
  action$.pipe(
    ofType('fetchNewest'),
    mergeMap(
      () => ajax.getJSON('https://api.github.com/users/whj1995')
        .pipe(map((response) => ({ type: 'content', data: JSON.stringify(response) })))
    )
  )

export default fetchNewest
