import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'grid',
    gridRowGap: '1rem',
    paddingTop: '1rem',
    justifyContent: 'center',
    alignContent: 'center',
    height: '-webkit-fill-available',
  },
});

class Loading extends React.Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <ScaleLoader
            sizeUnit={"em"}
            size={5}
            color={this.props.theme.palette.primary.main}
          />
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Loading);