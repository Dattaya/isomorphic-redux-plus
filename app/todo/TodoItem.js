import React, { PropTypes } from 'react';
import { Button, Card, CardActions, CardText } from 'styled';

export default function TodoItem({ editable, onDelete, onEdit, children }) {
  return (
    <Card>
      <CardText>{children}</CardText>
      {editable &&
        <CardActions>
          <Button onClick={onDelete}>X</Button>
          <Button onClick={onEdit}>Edit</Button>
        </CardActions>
      }
    </Card>
  );
}

TodoItem.propTypes = {
  editable: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  children: PropTypes.any,
};

TodoItem.defaultProps = {
  editable: false,
  onDelete: () => {},
  onEdit: () => {},
};
