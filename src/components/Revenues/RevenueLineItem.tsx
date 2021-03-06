import React, { useState } from "react";
import { Theme, createStyles, withStyles, WithStyles } from "@material-ui/core";
import { Revenue } from "../../interfaces/revenueInterfaces";
import RevenueDescriptionInput from "./RevenueDescriptionInput";
import RevenueInput from "./RevenueInput";
import { useDispatch } from "react-redux";
import { updateRevenue, deleteRevenue } from "../../actions/revenueActions";
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
    fadeOut: {
      animation: "$fadeOut ease 1s",
    },
    "@keyframes fadeOut": {
      "0%": { opacity: 1 },
      "100%": { opacity: 0 },
    },
  });

const RevenueLineItem = (props: RevenueLineItemProps) => {
  const [isDescriptionEditing, setIsEditing] = useState(false);
  const [removeDelete, setRemoveDelete] = useState(false);
  const classes = props.classes;
  const dispatch = useDispatch();

  const handleRevenueChange = (revenue: Revenue) => {
    return dispatch(updateRevenue(revenue));
  };

  const handleIsEditing = (isEditing: boolean) => {
    if (isEditing) {
      setIsEditing(isEditing);
    } else {
      setRemoveDelete(false);
      setIsEditing(isEditing);
    }
  };

  const handleDelete = () => {
    dispatch(deleteRevenue(revenue));
  };

  const iconSection: any = () => {
    if (isDescriptionEditing) {
      return (
        <DeleteIcon
          className={`${removeDelete ? classes.fadeOut : ""}`}
          onClick={handleDelete}
        />
      );
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
        detachEditing={() => setRemoveDelete(true)}
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
