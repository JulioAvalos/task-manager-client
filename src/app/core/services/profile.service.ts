import {Injectable} from '@angular/core';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import {IGetProfile} from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apollo: Apollo) {
  }

  private readonly PROFILE_QUERY = gql`
    query GetProfile {
      profile {
        id
        fullName
        email
        avatar
        type
        createdAt
        updatedAt
      }
    }
  `;

  getProfile(): QueryRef<IGetProfile> {
    return this.apollo.watchQuery<IGetProfile>({
      query: this.PROFILE_QUERY,
    });
  }
}
