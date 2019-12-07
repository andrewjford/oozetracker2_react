import Loading from "./Loading";
import React from "react";
import { withStyles, WithStyles } from "@material-ui/core";

interface LoadingPageProps extends WithStyles<typeof styles> {
  getFunction: () => Promise<any>;
  actualComponent: React.Component;
}

class LoadingPage extends React.Component<
  LoadingPageProps,
  { isLoading: boolean }
> {
  constructor(props: LoadingPageProps) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.getFunction().then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className={this.props.classes.container}>
          <Loading />
        </div>
      );
    } else {
      return this.props.actualComponent;
    }
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
