import React, { useState, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import { Badge } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import FilterController from "./filterController";
import ActionController from "./ActionController";
import CompletePercentage from "./progressBar";
import SearchMode from "./ToggleSearchMode";
import SearchInput from "./SearchInput";
import View from "./view";
const defaultDatas = [
  {
    id: uuidv4(),
    title: "shopping",
    isSelected: false,
    isCompleted: false,
    isImportant: false,
  },
  {
    id: uuidv4(),
    title: "Watching Tv",
    isSelected: false,
    isCompleted: true,
    isImportant: false,
  },
];
export default function Index() {
  const [datas, setDatas] = useState([...defaultDatas]);
  const [mode, setMode] = useState("all");
  const [selectedMode, setSelectedMode] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValues] = useState({ id: "", title: "" });
  const getData = (data) => {
    setDatas((p) => [data, ...p]);
  };
  useEffect(() => {
    console.log(editMode);
  });
  const toggleCompleted = (id) => {
    let data = datas.slice();
    let values = data.find((x) => x.id == id);
    values.isCompleted = !values.isCompleted;
    setDatas((p) => [...data]);
  };

  const deleteHandle = (id) => {
    let data = datas.slice().filter((x) => x.id != id);
    setDatas((p) => [...data]);
  };

  const selectToggle = (id) => {
    let data = datas.slice();
    let value = data.find((x) => x.id == id);
    value.isSelected = !value.isSelected;
    setDatas((p) => [...data]);
  };
  const importantToggle = (id) => {
    let data = datas.slice();
    let value = data.find((x) => x.id == id);
    value.isImportant = !value.isImportant;
    setDatas((p) => [...data]);
  };

  const completePercent = () => {
    let data = datas.slice();
    let totalCompleted = data.filter((x) => x.isCompleted).length;
    if (!totalCompleted) {
      return 0;
    }
    return Math.round((totalCompleted / data.length) * 100);
  };

  const filterByModeHandler = (value) => {
    setMode((p) => value);
  };
  const filterData = (data) => {
    if (mode == "completed") {
      return data.filter((x) => x.isCompleted);
    } else if (mode == "running") {
      return data.filter((x) => !x.isCompleted);
    } else if (mode == "important") {
      return data.filter((x) => x.isImportant);
    }
    return data;
  };

  const resetHandle = () => {
    setMode((p) => "all");
    setSelectedMode((p) => false);
    setDatas((p) => []);
    setIsReset((p) => !p);
  };
  const bulkSelectHandle = () => {
    let data = datas.slice().map((x) => ({ ...x, isSelected: !x.isSelected }));
    setDatas((p) => [...data]);
    setSelectedMode((p) => !p);
  };
  const bulkRemoveHandle = () => {
    let data = datas.slice().filter((x) => !x.isSelected);
    setDatas((p) => [...data]);
  };

  const toggleSearchMode = () => {
    setSearchMode((p) => !p);
  };

  const searchHandle = (e) => {
    setSearchValue((p) => e.target.value);
  };
  const filterBySearching = (data) => {
    return data.filter((x) =>
      x.title.toUpperCase().includes(searchValue.toUpperCase())
    );
  };

  const toggleEdit = (data) => {
    setEditMode((p) => true);
    setEditedValues((p) => ({ id: data.id, title: data.title }));
    setSearchMode((p) => false);
  };
  const updateHandle = (id, value) => {
    let data = datas.slice();
    let values = data.find((x) => x.id == id);
    values.title = value;
    setDatas((p) => [...data]);
    setEditMode((p) => !p);
  };
  const showInputBox = () => {
    if (!editMode) {
      if (!searchMode) {
        return (
          <CreateTodo
            getData={getData}
            mode={mode}
            isReset={isReset}
            placeholder="create todos"
          />
        );
      }
      return <SearchInput value={searchValue} searchHandle={searchHandle} />;
    }
    return (
      <CreateTodo
        editMode={editMode}
        placeholder="update value"
        editedValue={editedValue}
        updateHandle={updateHandle}
      />
    );
  };

  const TodoShow = () => {
    let data = filterData(datas.slice());
    data = filterBySearching(data);
    return data.map((x) => (
      <View
        data={x}
        key={x.id}
        toggleCompleted={toggleCompleted}
        deleteHandle={deleteHandle}
        selectToggle={selectToggle}
        importantToggle={importantToggle}
        toggleEdit={toggleEdit}
      />
    ));
  };
  return (
    <div className="container">
      <div className="col-md-10 " style={{ margin: "auto" }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">TODO APPLICATION</h1>
            <span>
              <SearchMode
                mode={searchMode}
                toggleSearchMode={toggleSearchMode}
                editMode={editMode}
              />
            </span>
          </div>
          <div className="col-md-12" style={{ marginTop: "5px" }}>
            {showInputBox()}
          </div>
        </div>
        <div className="row" style={{ marginTop: "5px" }}>
          <div className="col-md-12 d-flex  justify-content-between align-items-center">
            <FilterController filterByModeHandler={filterByModeHandler} />
            <Badge bg="danger" text="white">
              {`${mode.toUpperCase()} (${filterData(datas.slice()).length})`}
            </Badge>
            <ActionController
              resetHandle={resetHandle}
              bulkSelectHandle={bulkSelectHandle}
              bulkRemoveHandle={bulkRemoveHandle}
              selectedMode={selectedMode}
            />
          </div>
        </div>
        <div className="row ">
          <div
            className="col-md-12 "
            style={{ width: 150, height: 150, margin: "auto" }}
          >
            <CompletePercentage percent={completePercent()} />
          </div>
        </div>
        <div className="row ">{TodoShow()}</div>
      </div>
    </div>
  );
}
