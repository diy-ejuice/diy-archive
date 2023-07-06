import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function Comment({ comment }) {
  return (
    <Card body>
      <Card.Title>by {comment.author}</Card.Title>
      {comment.body}
    </Card>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
