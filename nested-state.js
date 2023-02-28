const redux = require('redux');
const createStore = redux.createStore;
const produce = require('immer').produce;

const initialState = {
    name: 'Slavcho',
    address: {
        street: 'Kliment Ohridski 140',
        city: 'Strumica',
        state: 'NM'
    }
}

const STREET_UPDATED = 'STREET_UPDATED';

const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }

            // this is the same as above under the hood
            // draft is draft coppy of the state which is mutable
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}

const store = createStore(reducer);

console.log('Initial state ', store.getState());
const unsubscribe = store.subscribe(() => {
    console.log('Updated state ', store.getState());
});
store.dispatch(updateStreet('Sveti Spaso Radoviski 5/2'));
unsubscribe();