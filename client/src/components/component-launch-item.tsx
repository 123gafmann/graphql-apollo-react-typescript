import * as React from 'react';
import * as classNames from 'classnames';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

export interface ILaunchItemProps {
    mission_name: string,
    flight_number: number,
    launch_date_local: string,
    launch_success: boolean
}

export class LaunchItem extends React.Component<ILaunchItemProps> {
    constructor(props: ILaunchItemProps) {
        super(props); 
        console.log(this.props);
    }
    public render() {
        const {mission_name, launch_date_local, launch_success, flight_number } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-9">
                        <h4>Mission: <span className={classNames({'text-success': launch_success, 'text-danger': !launch_success})}>{mission_name}</span></h4>
                        <p><Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment></p>
                    </div>
                    <div className="col-md-3">
                        <Link to={`/launch/${flight_number}`} className="btn btn-secondary">Launch Details</Link>
                    </div>
                </div>
            </div>
        )
    }
}