// Action Types Enum
export enum ActionTypes {
    RETURN_NAME = 'RETURN_NAME',
    RETURN_PERSON_NAME = 'RETURN_PERSON_NAME',
    SET_PERSON_NAME = 'SET_PERSON_NAME'
}

// Action Classes
export class ReturnName {
    readonly type = ActionTypes.RETURN_NAME;
}

export class ReturnPersonName {
    readonly type = ActionTypes.RETURN_PERSON_NAME;
}

export class SetPersonName {
    readonly type = ActionTypes.SET_PERSON_NAME;
}

// Action Classes Object
export const ActionClasses = {
    'RETURN_NAME': new ReturnName(),
    'RETURN_PERSON_NAME': new ReturnPersonName(),
    'SET_PERSON_NAME': new SetPersonName()
};

// Action Types
export type Actions =
    ReturnName
    | ReturnPersonName
    | SetPersonName;
