import PropTypes from 'prop-types';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Score({ score, suffix, ...props }) {
  return (
    <span {...props}>
      <FontAwesomeIcon color="#FF5700" icon={faArrowUp} fixedWidth /> {score}
      {Boolean(suffix) && ` ${suffix}`}
    </span>
  );
}

Score.propTypes = {
  score: PropTypes.number.isRequired,
  suffix: PropTypes.string
};
