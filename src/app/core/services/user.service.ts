import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {IGetUsersResponse} from '../models/user.model';
import {ApolloQueryResult} from '@apollo/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) {
  }

  getUsers(): Observable<ApolloQueryResult<IGetUsersResponse>> {
    const GET_USERS = gql`
      query {
        users {
          id
          fullName
          email
          avatar
        }
      }
    `;
    return this.apollo.watchQuery<IGetUsersResponse>({
      query: GET_USERS,
    }).valueChanges;
  }

}
