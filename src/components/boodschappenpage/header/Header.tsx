import AddButton from "./AddButton";
import DropdownMenu from "./DropdownMenu";
import styles from "./Header.module.scss";
import HouseholdSelector from "./HouseholdSelector";

const Header = () => {
  console.log("Rendering BoodschappenHeader");

  return (
    <header className={`${styles.header}`}>
      <nav className="navbar navbar-expand pe-2">
        <div className="container align-items-center">
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center">
              {/* <i className={`bi bi-cart4 fs-3 me-3 ${styles.brandIcon}`}> </i> */}
              <strong className={`fs-5 me-2 ${styles.brandText}`}>
                Boodschappenlijstje
              </strong>
            </div>
            <div className={`d-flex flex-row align-items-baseline`}>
              {/* <div className={styles.selectorSpacer}></div> */}
              <HouseholdSelector />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-end">
            {/* <UserButton /> */}
            <AddButton />
            <DropdownMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
