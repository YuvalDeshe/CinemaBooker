'use client';

import React, { useState, useEffect } from "react";
import styles from "./actorinfoform.module.css";
import { useId } from "react";

type ActorInfoProps =  {
  name: string,
  disableDelete: boolean,
  onDelete: () => void,
  onChange: (actorName: string) => void
}


export default function ActorInfoForm({name, disableDelete, onDelete, onChange} : ActorInfoProps) {
  const uniqueId = useId();
  const [actor, setActor] = useState(name);

  //Notifies parent when local state changes
  useEffect(() => {
      onChange(actor);
    }, [actor]);

  return (
    <div className={styles.mainDiv}>
      <label className={styles.label}>Actor: </label>
      <input onChange={(e) => setActor(e.target.value)} required placeholder="John Doe" className={styles.inputField} type="text" id="cardNumber" name={`actorName-${uniqueId}`} />
      <button disabled={disableDelete} onClick={onDelete} type="button" className={disableDelete ? (styles.deleteButtonDisabled) : (styles.deleteButton)}>Delete</button>
    </div>
  );
}
