import React, { useState } from "react";
import Head from "../../layouts/Head";
import Select from "react-select";
import styles from "./ProductMaker.module.css";
import { nanoid } from "nanoid";
// Data
import data from "../../data/base.json";
import components from "../../data/components.json";

export default function ProductMaker() {
  const [isSearchable, setIsSearchable] = useState(true);
  const [isClearable, setIsClearable] = useState(true);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const componentItem = () => {
    return (
      <Select
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
        isOptionSelected={(option, selectValue) =>
          selectValue.some((i) => i === option)
        }
        isOptionDisabled={(option) =>
          option.isDisabled || selectedComponents.length >= selectedOption.slot
        }
        onChange={(e) => handleComponentsChange(e)}
      />
    );
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Selected Option:", selectedOption);
  };

  const handleComponentsChange = (selectedComponents) => {
    setSelectedComponents(selectedComponents);
    console.log("Selected Components:", selectedComponents);
  };

  return (
    <div>
      <Head title="Création de Produit"></Head>
      <h1>Création de produit</h1>
      <div className={styles.productMaker}>
        <Select
          options={data.base_component.map((data) => {
            return {
              key: data.id,
              label: data.name,
              value: data.name,
              slot: data.slot,
            };
          })}
          placeholder="Choisissez votre base"
          isSearchable={isSearchable}
          isClearable={isClearable}
          onChange={(e) => handleChange(e || "")}
        />
      </div>
      {selectedOption ? (
        <div className={styles.productMaker}>
          {componentItem(selectedComponents)}
        </div>
      ) : null}
    </div>
  );
}
