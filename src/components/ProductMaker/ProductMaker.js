import React, { useState } from "react";
import Head from "../../layouts/Head";
import Select from "react-select";
import styles from "./ProductMaker.module.css";
import { nanoid } from "nanoid";
// Data
import base from "../../data/base.json";
import components from "../../data/components.json";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function ProductMaker() {
  const [isSearchable, setIsSearchable] = useState(true);
  const [isClearable, setIsClearable] = useState(true);
  const [selectedBase, setSelectedBase] = useState();
  const [selectedComponent, setSelectedComponent] = useState([]);

  // Select des composants
  const componentItem = () => {
    return (
      <Select
        id="component"
        className={styles.productComponent}
        options={components.components.map((component) => {
          return {
            key: component.id,
            label: component.name,
            value: nanoid(),
            compatibility: component.compatibility,
          };
        })}
        isMulti
        placeholder="Choisissez vos composants"
        isSearchable={isSearchable}
        isClearable={isClearable}
        isOptionSelected={(option, selectValue) =>
          selectValue.some((i) => i === option)
        }
        isOptionDisabled={(option) =>
          option.isDisabled ||
          selectedComponent.length >= selectedBase.slot ||
          selectedComponent.some((i) => !i.compatibility.includes(option.key))
        }
        onChange={(e) => handleComponentsChange(e)}
      />
    );
  };

  // Gestion du state de selectedBase
  const handleBaseChange = (selectedBase) => {
    setSelectedBase(selectedBase);
    console.log("Selected Base :", selectedBase);
  };

  // Gestion du state des selectedComponent
  const handleComponentsChange = (selectedComponent) => {
    setSelectedComponent(selectedComponent);
    console.log("Selected Components:", selectedComponent);
  };

  // Gestion de l'input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset selectedComponent si un composant a été sélectionné
    // if (selectedComponent) {
    //   setSelectedBase(null);
    //   setSelectedComponent([]);
    // }
    console.log(
      "Submitted Base :",
      selectedBase,
      "Submitted Components :",
      selectedComponent
    );
  };

  // Gestion de l'input button pour effacer les composants selectionnés
  const handleClear = () => {
    setSelectedBase(null);
    setSelectedComponent([]);
    console.log(
      "Deleted Base :",
      selectedBase,
      "Deleted Component :",
      selectedComponent
    );
  };

  return (
    <div>
      <Head title="Création de Produit"></Head>
      <h1>Création de produit</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="base">Choix de la base</label>
        <div className={styles.productMaker}>
          {/* Select de la base */}
          <Select
            id="base"
            options={base.base_component.map((base) => {
              return {
                key: base.id,
                label: base.name,
                value: base.name,
                slot: base.slot,
              };
            })}
            placeholder="Choisissez votre base"
            isSearchable={isSearchable}
            isClearable={isClearable}
            isDisabled={isDisabled ? selectedBase : null}
            onChange={(e) => handleBaseChange(e)}
          />
        </div>
        {/* Si une base a été choisie, la condition permet d'afficher le componnentItem() */}
        {selectedBase ? (
          <label htmlFor="component">Choix des composants</label>
        ) : null}
        {selectedBase ? (
          <div className={styles.productMaker}>
            {componentItem(selectedComponent)}
            {selectedComponent.length == selectedBase.slot &&
            selectedComponent ? (
              <input type="submit" value="Envoyer" />
            ) : null}
            <input type="button" onClick={handleClear} value="Effacer" />
          </div>
        ) : null}
      </form>
    </div>
  );
}
