import React from "react";
import styles from "./BoodschapRow.module.scss";
import BoodschapCheckbox from "../boodschapcheckbox/BoodschapCheckbox";
import BoodschapItem from "../boodschapitem/BoodschapItem";
import BoodschapDetails from "../boodschapdetails/BoodschapDetails";
import BoodschapCloseButton from "../boodschapclosebutton/BoodschapCloseButton";

interface BoodschapRowProps {
  boodschapId: any;
}

const BoodschapRow: React.FC<BoodschapRowProps> = ({ boodschapId }) => {
  return (
    <tr>
      <td className={styles.colWidth10}>
        <BoodschapCheckbox boodschapId={boodschapId} />
      </td>
      <td>
        <div className="row">
          <BoodschapItem boodschapId={boodschapId} />
          <BoodschapDetails boodschapId={boodschapId} />
        </div>
      </td>
      <td className={`text-end ${styles.colWidth10}`}>
        <BoodschapCloseButton boodschapId={boodschapId} />
      </td>
    </tr>
  );
};

export default BoodschapRow;
