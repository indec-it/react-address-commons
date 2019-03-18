/* eslint-disable max-len */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import {geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import {includes} from 'lodash';

import ArgentinaMap from '../../data/topoJson/argentina.json';

export const GBA = 'M1493 2529 c-33 -21 -43 -44 -23 -51 16 -5 -18 -66 -40 -73 -27 -8 -25 -19 10 -70 17 -24 30 -47 30 -52 0 -5 -13 -17 -30 -26 -16 -10 -37 -25 -46 -35 -9 -9 -27 -16 -40 -17 -12 0 -26 -3 -30 -7 -14 -15 -35 -8 -75 24 -21 17 -41 29 -43 27 -3 -3 0 -23 5 -46 10 -38 8 -47 -30 -129 -49 -103 -81 -148 -122 -169 -33 -17 -36 -35 -14 -69 23 -35 27 -68 9 -80 -25 -19 -9 -131 23 -156 20 -15 24 -27 21 -57 -3 -37 -2 -37 123 -132 117 -89 239 -197 239 -210 0 -3 -34 -17 -75 -30 -41 -14 -75 -27 -75 -30 0 -2 15 -17 32 -31 29 -24 31 -29 18 -44 -12 -16 -6 -25 61 -87 81 -76 103 -82 161 -39 15 11 29 20 32 20 2 0 17 -20 33 -45 15 -25 36 -48 46 -51 9 -3 24 -18 32 -33 13 -26 13 -30 -5 -46 -11 -10 -20 -21 -20 -24 0 -3 32 -35 71 -70 75 -68 89 -69 89 -9 0 26 30 68 48 68 4 0 26 18 47 40 21 22 44 40 50 40 6 0 24 -13 39 -29 28 -29 28 -32 21 -105 -4 -42 -3 -76 1 -76 4 0 26 15 49 34 23 19 55 38 71 42 33 8 60 33 66 60 2 10 12 20 23 23 11 2 46 20 79 41 54 35 61 37 72 22 7 -9 10 -20 8 -24 -3 -5 -1 -8 4 -8 5 0 17 -12 27 -26 13 -20 14 -28 4 -40 -9 -11 -8 -23 5 -57 28 -74 30 -74 73 -37 21 19 38 37 38 41 0 4 21 30 48 57 26 28 47 54 47 57 0 4 61 71 135 150 l135 142 0 132 c0 152 5 145 -116 157 -62 7 -69 10 -108 51 -22 24 -57 54 -76 67 -19 13 -75 50 -125 82 -49 33 -105 72 -124 89 -29 25 -35 27 -45 14 -19 -26 -90 -69 -113 -69 -13 0 -23 -5 -23 -11 0 -8 -5 -8 -15 1 -18 15 -39 1 -61 -41 -15 -30 -76 -54 -100 -41 -7 4 -43 34 -79 67 l-67 60 3 85 c2 47 9 94 16 106 7 11 20 44 28 72 14 47 21 55 65 77 48 24 48 25 43 67 -2 23 -9 50 -14 59 -5 10 -9 25 -9 34 0 27 -69 108 -115 135 -25 14 -55 35 -67 46 -13 11 -37 26 -55 33 -18 7 -38 19 -44 27 -6 8 -35 28 -65 44 -29 17 -74 49 -101 70 -26 22 -50 40 -53 40 -3 0 -20 -10 -37 -21z';
export const CABA = 'M2019 1984 c-47 -28 -58 -40 -63 -68 -4 -19 -13 -47 -22 -64 -8 -17 -17 -66 -21 -109 l-6 -79 64 -58 c35 -32 71 -61 79 -66 23 -12 73 13 90 46 20 38 28 44 68 44 56 0 152 56 137 80 -3 4 2 10 10 14 21 8 19 37 -4 43 -15 4 -22 20 -30 66 -11 63 -24 80 -53 73 -16 -4 -32 6 -113 69 -46 35 -61 44 -70 44 -5 0 -35 -16 -66 -35z';

const projection = () => geoMercator().scale(100);

const getColor = (selectedState, state, availableStates) => {
    if (selectedState.state === state) {
        return 'rgba(27, 83, 120, 1)';
    }
    if (includes(availableStates, selectedState.state)) {
        return 'rgba(2, 141, 200, 1)';
    }
    return 'rgba(0, 0, 0, 0.1)';
};

const renderPopover = state => (
    <Popover
        id="stateName"
        className="text-center"
        title={(
            <span>
                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                &nbsp;
                {state.state}
            </span>
        )}
    >
        {state.name}
    </Popover>
);

const Argentina = ({
    availableStates, selectedState, handleClick
}) => (
    <Fragment>
        <svg
            viewBox="350 287 45 80"
            stroke="#fff"
            strokeWidth={0.08}
        >
            <g className="countries">
                {feature(ArgentinaMap, ArgentinaMap.objects.argentina).features.map(d => (
                    <OverlayTrigger
                        key={d.state}
                        trigger={['focus', 'hover']}
                        placement="bottom"
                        rootClose
                        overlay={
                            renderPopover(d.properties)
                        }
                    >
                        <path
                            d={geoPath().projection(projection())(d)}
                            fill={
                                getColor(
                                    d.properties,
                                    selectedState.state,
                                    availableStates
                                )
                            }
                            onClick={() => handleClick(d)}
                            onTouchStart={() => handleClick(d)}
                        />
                    </OverlayTrigger>
                ))}
            </g>
        </svg>
        <svg
            height="50%"
            width="50%"
            viewBox="95 25 200 222"
            style={{
                position: 'absolute',
                zIndex: 999,
                bottom: '0%',
                left: '44%'
            }}
            stroke="#000"
            strokeWidth={0.1}
        >
            <g transform="translate(0,292) scale(0.1,-0.1)">
                <OverlayTrigger
                    trigger={['focus', 'hover']}
                    placement="bottom"
                    rootClose
                    overlay={
                        renderPopover({state: 4, name: 'GBA Partidos'})
                    }
                >
                    <path
                        d={GBA}
                        fill={
                            getColor(
                                {state: 4},
                                selectedState.state,
                                availableStates
                            )
                        }
                        onClick={() => handleClick({
                            properties: {state: 4, name: 'GBA Partidos'}
                        })}
                        onTouchStart={() => handleClick({
                            properties: {state: 4, name: 'GBA Partidos'}
                        })}
                    />
                </OverlayTrigger>
                <OverlayTrigger
                    trigger={['focus', 'hover']}
                    placement="bottom"
                    rootClose
                    overlay={
                        renderPopover({state: 2, name: 'CABA'})
                    }
                >
                    <path
                        d={CABA}
                        fill={
                            getColor(
                                {state: 2},
                                selectedState.state,
                                availableStates
                            )
                        }
                        onClick={() => handleClick({
                            properties: {state: 2, name: 'CABA'}
                        })}
                        onTouchStart={() => handleClick({
                            properties: {state: 2, name: 'CABA'}
                        })}
                    />
                </OverlayTrigger>
            </g>
        </svg>
    </Fragment>
);

Argentina.propTypes = {
    availableStates: PropTypes.arrayOf(PropTypes.number),
    selectedState: PropTypes.shape({}),
    handleClick: PropTypes.func.isRequired
};

Argentina.defaultProps = {
    availableStates: null,
    selectedState: {
        state: null,
        name: null
    }
};

export default Argentina;
