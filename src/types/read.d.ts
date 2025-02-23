import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

/**
 * Typing boolean SetStateAction prop
 *
 * @param {S} - any type
 */
type setStateAction<S> = Dispatch<SetStateAction<S>>;

/**
 * Typing value and SetValue for useState prop
 *
 * @param {S} - any type
 */
type useStateProp<S> = [S, setStateAction];

type EventSelectType = ChangeEvent<HTMLSelectElement>;
type EventInputType = FormEvent<HTMLInputElement>;

export { setStateAction, useStateProp, EventSelectType, EventInputType };