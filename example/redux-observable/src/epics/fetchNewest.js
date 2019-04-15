import { map, mergeMap, takeUntil } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable'

const fetchNewest = action$ =>
  action$.pipe(
    ofType('fetchNewest'),
    mergeMap(
      () => ajax.getJSON('https://api.github.com/users/whj1995')
        .pipe(
          map((response) => ({ type: 'content', data: JSON.stringify(response) })),
          takeUntil(action$.pipe(
            ofType('cancel')
          ))
        )
    )
  )

export default fetchNewest
