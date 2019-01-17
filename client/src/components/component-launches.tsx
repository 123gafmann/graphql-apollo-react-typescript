import * as React from 'react'

import gql  from 'graphql-tag';
import { Query } from 'react-apollo';

import {LaunchItem, ILaunchItemProps} from './component-launch-item';
import { MissionKey } from './component-mission-key';
const Launches_Query = gql`
query LaunchesQuery {
    launches {
      flight_number
      launch_success
      launch_year
      mission_name
      launch_date_local
    }
  }
`;

export class Launches extends React.Component {
  public render() {
    return (
      <>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey />
        <Query query={Launches_Query}>
            {
                ({loading, error, data}) => {
                    if(loading) {
                        return <h4>loading ...</h4>
                    }

                    if(error) {
                        console.log(error)
                        return <h4>Error occured</h4>
                    }
                    
                    const items = data.launches.map((launch: ILaunchItemProps) => {
                        return <LaunchItem key={launch.flight_number} {...launch}/>
                    });
                    return items;
                }
            }
        </Query>
      </>
    )
  }
}
