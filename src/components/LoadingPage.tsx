import Loading from "./Loading";
import React from "react";
import { withStyles, WithStyles } from "@material-ui/core";

interface LoadingPageProps extends WithStyles<typeof styles> {
  getFunction: () => Promise<any>;
}

class LoadingPage extends React.Component<LoadingPageProps> {
  componentDidMount() {
    this.props.getFunction();
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        <Loading />
      </div>
    );
  }
}

const styles = (theme: any) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridColumn: "1 / -1",
    height: "80vh"
  }
});

export default withStyles(styles)(LoadingPage);
