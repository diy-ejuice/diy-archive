import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

export default function Flair({ text, color }) {
  return text ? (
    <Badge
      bg="none"
      style={{
        backgroundColor: color ?? 'rgba(var(--bs-primary-rgb))'
      }}
    >
      {text}
    </Badge>
  ) : null;
}

Flair.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
};
