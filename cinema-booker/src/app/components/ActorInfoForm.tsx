'use client';

import React from "react";
import styles from "./actorinfoform.module.css";
import { useActorInfoFormController } from "@/controllers/ActorInfoFormController";
import { ActorInfoProps } from "@/models/ActorInfoFormPropsInterface";

export default function ActorInfoForm({name, disableDelete, onDelete, onChange,}: ActorInfoProps) {
  const c = useActorInfoFormController(name, onChange, onDelete);

  return (
    <div className={styles.mainDiv}>
      <label className={styles.label}>Actor: </label>
      <input value={c.actor} onChange={(e) => c.handleInputChange(e.target.value)} required placeholder="John Doe" className={styles.inputField} type="text" id={`actorName-${c.uniqueId}`} name={`actorName-${c.uniqueId}`} />
      <button disabled={disableDelete} onClick={c.handleDelete} type="button" className={disableDelete ? (styles.deleteButtonDisabled) : (styles.deleteButton)}>Delete</button>
    </div>
  );
}
