import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Chart from 'chart.js';

import Radios from './Radios';
import Blocks from './Blocks';
import Sides from './Sides';
import Dwellings from './Dwellings';
import DwellingsTypes from './DwellingsTypes';
import Users from './Users';
import Synchronization from './Synchronization';
import parseResponse from '../parseResponse';

// ¡¡¡¡ IMPORTANT !!!! This for draw text or number in the middle of Doughnuts
if (Chart) {
    Chart.pluginService.register({
        beforeDraw(chart) {
            if (chart.config.options.elements.center) {
                const {ctx} = chart.chart;

                const centerConfig = chart.config.options.elements.center;
                const fontStyle = centerConfig.fontStyle || 'Arial';
                const txt = centerConfig.text;
                const color = centerConfig.color || '#000';
                const sidePadding = centerConfig.sidePadding || 20;
                const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);

                ctx.font = `30px ${fontStyle}`;

                const stringWidth = ctx.measureText(txt).width;
                const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                const widthRatio = elementWidth / stringWidth;
                const newFontSize = Math.floor(30 * widthRatio);
                const elementHeight = (chart.innerRadius * 2);

                const fontSizeToUse = Math.min(newFontSize, elementHeight);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = `${fontSizeToUse}px ${fontStyle}`;
                ctx.fillStyle = color;

                ctx.fillText(txt, centerX, centerY);
            }
        }
    });
}
// ¡¡¡¡ IMPORTANT !!!!

const MonitoringGraphics = ({
    province, selectedState, blocks, sides, dwellings, dwellingsTypes
}) => {
    const {
        provinceData, blocksResponse, sidesResponse, dwellingsResponse, dwellingsTypesResponse
    } = parseResponse(selectedState.state, province, {
        blocks, sides, dwellings, dwellingsTypes
    });
    return (
        <Fragment>
            <Row>
                <Col sm={5}>
                    <Radios provinceData={provinceData} stateName={selectedState.name}/>
                </Col>
                <Col sm={7}>
                    <Row>
                        <Col sm={4} className="col-no-padding-left">
                            <Blocks blocksResponse={blocksResponse}/>
                        </Col>
                        <Col sm={4} className="col-middle-padding">
                            <Sides sidesResponse={sidesResponse}/>
                        </Col>
                        <Col sm={4} className="col-no-padding-right">
                            <Dwellings dwellingsResponse={dwellingsResponse}/>
                        </Col>
                    </Row>
                    <Row>
                        <DwellingsTypes dwellingsTypes={dwellingsTypesResponse}/>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Users/>
                </Col>
                <Col sm={6}>
                    <Synchronization/>
                </Col>
            </Row>
        </Fragment>
    );
};

MonitoringGraphics.propTypes = {
    province: PropTypes.shape({}),
    selectedState: PropTypes.shape({
        state: PropTypes.number,
        name: PropTypes.string
    }),
    blocks: PropTypes.arrayOf(PropTypes.shape({})),
    sides: PropTypes.arrayOf(PropTypes.shape({})),
    dwellings: PropTypes.arrayOf(PropTypes.shape({})),
    dwellingsTypes: PropTypes.arrayOf(PropTypes.shape({}))
};

MonitoringGraphics.defaultProps = {
    blocks: [],
    sides: [],
    dwellings: [],
    dwellingsTypes: [],
    selectedState: {},
    province: {}
};

export default connect(state => ({
    province: state.overview.general,
    selectedState: state.overview.selectedState,
    blocks: state.overview.blocks,
    sides: state.overview.sides,
    dwellings: state.overview.dwellings,
    dwellingsTypes: state.overview.dwellingsTypes
}))(MonitoringGraphics);
