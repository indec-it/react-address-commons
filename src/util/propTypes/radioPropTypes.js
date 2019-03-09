import PropTypes from 'prop-types';

export default PropTypes.shape({
    state: PropTypes.string,
    department: PropTypes.string,
    agglomerate: PropTypes.number,
    locality: PropTypes.number,
    radio: PropTypes.number,
    fraction: PropTypes.number,
    ups: PropTypes.number,
    area: PropTypes.number
});
