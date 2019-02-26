import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.alt1 + "!important"
    }
  }
});

class HoverTableRow extends React.Component {
  render() {
    return (
      <TableRow hover key={this.props.key}
        classes={this.props.classes}>
        {this.props.children}
      </TableRow>
    )
  }
}

export default withStyles(styles)(HoverTableRow);
