import React, { useState } from "react";
import {
  Theme,
  createStyles,
  withStyles,
  WithStyles,
  Typography,
} from "@material-ui/core";
import { Revenue } from "../../interfaces/revenueInterfaces";
import RevenueDescriptionInput from "./RevenueDescriptionInput";
import RevenueInput from "./RevenueInput";
import { useDispatch } from "react-redux";
import {
  createRevenue,
  updateRevenue,
  deleteRevenue,
} from "../../actions/revenueActions";
import DeleteIcon from "@material-ui/icons/Delete";

interface RevenueLineItemProps extends WithStyles<typeof styles> {
  revenue: Revenue;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "grid",
      gridTemplateColumns: "30% auto 60%",
      width: "100%",
      padding: "0.25rem 0",
    },
    col1: {
      gridColumn: "1 / 2",
    },
    icon: {
      gridColumn: "2",
      display: "grid",
      alignContent: "end",
    },
  });

const RevenueLineItem = (props: RevenueLineItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = props.classes;
  const dispatch = useDispatch();

  const handleRevenueChange = (revenue: Revenue) => {
    if (revenue.id) {
      return dispatch(updateRevenue(revenue));
    } else {
      return dispatch(createRevenue(revenue));
    }
  };

  const handleIsEditing = (isEditing: boolean) => {
    setIsEditing(isEditing);
  };

  const iconSection: any = () => {
    if (revenue.id && isEditing) {
      return <DeleteIcon onClick={() => dispatch(deleteRevenue(revenue))} />;
    } else {
      return null;
    }
  };

  const revenue = props.revenue;

  return (
    <div className={classes.root}>
      <RevenueDescriptionInput
        description={revenue.description}
        handleSubmit={(description: string) =>
          handleRevenueChange({ ...revenue, description })
        }
        handleIsEditing={handleIsEditing}
      />

      <div className={classes.icon}>{iconSection()}</div>

      <RevenueInput
        revenue={revenue}
        handleOnBlur={(updatedRev: Revenue) => {
          setIsEditing(false);
          handleRevenueChange(updatedRev);
        }}
      />
    </div>
  );
};

export default withStyles(styles)(RevenueLineItem);
