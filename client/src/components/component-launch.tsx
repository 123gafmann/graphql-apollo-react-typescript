import * as React from 'react';
import * as classNames from 'classnames';
import {Link} from 'react-router-dom';

import gql  from 'graphql-tag';
import { Query } from 'react-apollo';

const Launch_Query = gql`
    query LaunchQuery($flt_number: Int!) {
        launch(flight_number: $flt_number) {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
            rocket {
                rocket_name
                rocket_type,
                rocket_id
            }
        }
    }
`;

export interface ILaunchProps {
    flight_number: number
    match: any
}

export class Launch extends React.Component<ILaunchProps> {
    constructor(props:ILaunchProps) {
        super(props);
    }
    public render() {
        let {flight_number} = this.props.match.params;
        let flt_number = parseInt(flight_number);
        return (
            <>
                <Query query={Launch_Query} variables={{flt_number}}>
                    {
                        ({loading, error, data}) => {
                            if(loading) {
                                return <h4>loading ...</h4>
                            }
        
                            if(error) {
                                console.log(error)
                                return <h4>Error occured</h4>
                            }
                            let {mission_name, launch_year, launch_success, rocket: {rocket_id, rocket_type, rocket_name}} = data.launch;
                            console.log(data.launch);
                            return (
                                <>
                                    <div>
                                        <h1 className="display-4 my-3">
                                            <span className="text_dark">Mission:</span> {mission_name}
                                        </h1>
                                        <h4 className="mb-3">Launch Details</h4>
                                        <ul className="list-group">
                                            <li className="list-group-item">Flight number: {flight_number}</li>
                                            <li className="list-group-item">Launch year: {launch_year}</li>
                                            <li className="list-group-item">Launch successful: <span className={classNames({'text-success':launch_success, 'text-danger': !launch_success})}> {launch_success? 'Yes':'No'}</span></li>
                                        </ul>
                                        <h4 className="my-3">Rocket Details</h4>
                                        <ul className="list-group">
                                            <li className="list-group-item">Rocket id: {rocket_id}</li>
                                            <li className="list-group-item">Rocket type: {rocket_type}</li>
                                            <li className="list-group-item">Rocket name: {rocket_name}</li>
                                        </ul>
                                        <hr />
                                        <Link to="/" className="btn btn-secondary">Back</Link>
                                    </div>
                                </>
                            );
                        }
                    }
                </Query>
            </>
        );
    }
}