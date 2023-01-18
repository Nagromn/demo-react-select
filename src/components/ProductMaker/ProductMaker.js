import React, { useState } from "react";
import Head from "../../layouts/Head";
import Select from "react-select";
import styles from "./ProductMaker.module.css";
import { nanoid } from "nanoid";

// Data
import base from "../../data/base.json";
import components from "../../data/components.json";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProductMaker() {
  const [isSearchable, setIsSearchable] = useState(true);
  const [isClearable, setIsClearable] = useState(true);
  const [selectedBase, setSelectedBase] = useState();
  const [selectedComponent, setSelectedComponent] = useState([]);
  const [submitted, setIsSubmitted] = useState(false);

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
            path: component.path,
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
    setIsSubmitted(true);
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
    setIsSubmitted(false);
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
        <div className={styles.titleDisplay}>
          <img
            className={styles.iconSvg}
            src={require("../../img/1.svg").default}
            alt="1"
          />
          <h2>Choix de la base</h2>
        </div>
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
            isDisabled={selectedBase ? true : null}
            onChange={(e) => handleBaseChange(e)}
          />
        </div>

        {/* Si une base a été choisie, la condition permet d'afficher le componnentItem() */}

        {selectedBase ? (
          <div>
            <div className={styles.titleDisplay}>
              <img
                className={styles.iconSvg}
                src={require("../../img/2.svg").default}
                alt="2"
              />
              <h2>Choix des composants</h2>
            </div>
          </div>
        ) : null}
        {selectedBase ? (
          <div className={styles.productMaker}>
            <div>{componentItem(selectedComponent)}</div>
            {selectedComponent.length === selectedBase.slot &&
            selectedComponent ? (
              <Button className={styles.button} type="submit">
                Valider
              </Button>
            ) : null}
            <Button
              variant="danger"
              className={styles.button}
              onClick={handleClear}
            >
              Supprimer
            </Button>
          </div>
        ) : null}

        {/* Si une base et un composant ont été choisies, afficher les images des composants sélectionnés */}
        {selectedBase && selectedComponent ? (
          <div className={styles.productMaker}>
            {selectedComponent.map((val) => (
              <div className={styles.productMaker}>
                <img src={val.path} alt={val.label} />
              </div>
            ))}
          </div>
        ) : null}

        {/* Si le formulaire a été soumis, afficher la base et les composants sélectionnés */}
        {submitted ? (
          <div>
            <div className={styles.titleDisplay}>
              <img
                className={styles.iconSvg}
                src={require("../../img/3.svg").default}
                alt="3"
              />
              <h2>Produit enregistré</h2>
            </div>
            <h3>{selectedBase.label}</h3>
            <div className={styles.productMaker}>
              {selectedComponent.map((val) => (
                <div className={styles.row}>
                  <div className={styles.column}>
                    <Card className={styles.cardContainer}>
                      <Card.Body>
                        <Card.Img src={val.path} alt={val.label} />
                        <Card.Text>{val.label}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="danger" onClick={handleClear}>
              Supprimer
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
