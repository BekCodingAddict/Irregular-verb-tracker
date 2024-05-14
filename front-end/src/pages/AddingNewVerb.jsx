import { useRef } from "react";
import styles from "./AddingNewVerb.module.css";

function AddingNewVerb() {
  const existRef = useRef(false);
  const handeAddVerb = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newData = {
      baseForm: data.get("baseForm"),
      pastSimple: data.get("pastSimple"),
      pastParticiple: data.get("pastParticiple"),
    };

    const existVerb = await fetch(`http://localhost:9000/irregularVerbs`);
    const isExistVerb = await existVerb.json();

    isExistVerb.forEach((obj) => {
      if (obj.baseForm === newData.baseForm) {
        alert("This verb is already exist");
        existRef.current = true;
        return;
      }
    });

    if (existRef.current === false) {
      const resp = await fetch(`http://localhost:9000/irregularVerbs/`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("New verb has been added  successfully!");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>Add your new English Irregular Verbs.</h3>
        <p>
          It helps you organize and categorize new words efficiently, making it
          easier to track your progress and revisit words for reinforcement.
        </p>
      </div>
      <form onSubmit={handeAddVerb}>
        <div className="mb-2">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Base form
          </label>
          <input
            name="baseForm"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Past Simple form
          </label>
          <input
            name="pastSimple"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Past Participle form
          </label>
          <input
            name="pastParticiple"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            required
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Make sure all information are right?
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Adding New Verb
        </button>
      </form>
    </div>
  );
}

export default AddingNewVerb;
