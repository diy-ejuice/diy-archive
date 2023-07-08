import PropTypes from 'prop-types';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CommentCount({ count, ...props }) {
  return (
    <span {...props}>
      <FontAwesomeIcon icon={faComments} fixedWidth /> {count}
    </span>
  );
}

CommentCount.propTypes = {
  count: PropTypes.number.isRequired
};
