import { useReducer } from "react";
import PageNav from "../components/PageNav";
import AddingNewVerb from "./AddingNewVerb";
import styles from "./AppLayout.module.css";

const initialState = {
  addBtnisClicked: false,
  irregularVerbs: {
    baseForm: "",
    pastSimple: "",
    pastParticile: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AddBtnClicked":
      return { ...state, addBtnisClicked: !state.addBtnisClicked };
    case "newVerbSubmitted":
      return { ...state };
  }
};

function AppLayout() {
  const [{ addBtnisClicked, irregularVerbs }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className={styles.wrapper}>
      <PageNav dispatch={dispatch} />
      {addBtnisClicked && <AddingNewVerb />}
    </div>
  );
}

export default AppLayout;
