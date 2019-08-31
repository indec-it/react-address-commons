import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Bar} from 'react-chartjs-2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAddressBook, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {
    filter, includes, reject, sumBy, toNumber
} from 'lodash';
import 'chartjs-plugin-datalabels';

import {getTooltipLabel} from '../utils';
import {roles as rolesEnum} from '../../../constants';

const parseData = (users, state, roles) => {
    const filteredUsers = filter(
        reject(users, u => (
            includes(u.roles, rolesEnum.NATIONAL_COORDINATOR) || includes(u.roles, rolesEnum.NATIONAL_COORDINATOR_RO))
        ),
        u => (state ? u.state === state : true)
    );
    const pollsters = sumBy(filteredUsers, u => toNumber(includes(u.roles, rolesEnum.POLLSTER)));
    const coordinators = sumBy(filteredUsers, u => toNumber(includes(u.roles, rolesEnum.COORDINATOR)));
    const subCoordinators = sumBy(filteredUsers, u => toNumber(includes(u.roles, rolesEnum.SUB_COORDINATOR)));
    const supervisors = sumBy(filteredUsers, u => toNumber(includes(u.roles, rolesEnum.SUPERVISOR)));
    if (includes(roles, rolesEnum.NATIONAL_COORDINATOR) || includes(roles, rolesEnum.NATIONAL_COORDINATOR_RO)) {
        return {
            labels: [
                'Coordinadores',
                'Subcoordinadores',
                'Supervisores',
                'Actualizadores'
            ],
            datasets: [{
                data: [
                    coordinators,
                    subCoordinators,
                    supervisors,
                    pollsters
                ],
                backgroundColor: [
                    'rgba(225, 0, 0, 0.4)',
                    'rgba(0, 225, 0, 0.4)',
                    'rgba(0, 0, 225, 0.4)',
                    'rgba(225, 225, 0, 0.4)'
                ]
            }]
        };
    }
    if (includes(roles, rolesEnum.COORDINATOR)) {
        return {
            labels: [
                'Subcoordinadores',
                'Supervisores',
                'Actualizadores'
            ],
            datasets: [{
                data: [
                    subCoordinators,
                    supervisors,
                    pollsters
                ],
                backgroundColor: [
                    'rgba(0, 225, 0, 0.4)',
                    'rgba(0, 0, 225, 0.4)',
                    'rgba(225, 225, 0, 0.4)'
                ]
            }]
        };
    }
    if (includes(roles, rolesEnum.SUB_COORDINATOR)) {
        return {
            labels: [
                'Supervisores',
                'Actualizadores'
            ],
            datasets: [{
                data: [
                    supervisors,
                    pollsters
                ],
                backgroundColor: [
                    'rgba(0, 0, 225, 0.4)',
                    'rgba(225, 225, 0, 0.4)'
                ]
            }]
        };
    }
    return {
        labels: [
            'Actualizadores'
        ],
        datasets: [{
            data: [
                pollsters
            ],
            backgroundColor: [
                'rgba(225, 225, 0, 0.4)'
            ]
        }]
    };
};

const Users = ({
    users, selectedState, profile, loadingUsers
}) => (
    <div className="box-doughnut">
        <h4 className="users text-center">
            <FontAwesomeIcon icon={faAddressBook}/>
            &nbsp;
            Personal Designado al Operativo
        </h4>
        {loadingUsers ? <FontAwesomeIcon icon={faSpinner} pulse size="3x"/> : (
            <Bar
                data={parseData(users, selectedState.state, profile.roles)}
                height="100%"
                options={{
                    tooltips: {
                        callbacks: {
                            title: () => '',
                            label: getTooltipLabel
                        }
                    },
                    legend: {
                        display: false
                    },
                    plugins: {
                        datalabels: {
                            display: true,
                            color: '#000',
                            fontSize: 11,
                            anchor: 'end',
                            align: 'end',
                            offset: -7
                        }
                    },
                    backgroundColor: 'rgba(251, 85, 85, 0.4)',
                    showTooltips: false,
                    maintainAspectRatio: true,
                    responsive: true
                }}
            />
        )}
    </div>
);

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({})),
    state: PropTypes.number,
    profile: PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    selectedState: PropTypes.shape({
        state: PropTypes.number,
        name: PropTypes.string
    }),
    loadingUsers: PropTypes.bool
};

Users.defaultProps = {
    selectedState: {},
    users: [],
    state: null,
    loadingUsers: true
};

export default connect(state => ({
    users: state.overview.users,
    profile: state.session.profile,
    selectedState: state.overview.selectedState,
    loadingUsers: state.overview.loadingUsers
}))(Users);
