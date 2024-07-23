import React from "react";
import BoodschapCheckbox from "../boodschapcheckbox/BoodschapCheckbox";
import BoodschapCloseButton from "../boodschapclosebutton/BoodschapCloseButton";
import BoodschapDetails from "../boodschapdetails/BoodschapDetails";
import BoodschapItem from "../boodschapitem/BoodschapItem";
import styles from "./BoodschapRow.module.scss";

interface BoodschapRowProps {
  boodschapId: string;
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
