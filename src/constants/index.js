const roles = {
    NATIONAL_COORDINATOR: 'cn',
    NATIONAL_COORDINATOR_RO: 'ro',
    COORDINATOR: 'co',
    READ_ONLY_COORDINATOR: 'roc',
    SUB_COORDINATOR: 'sc',
    SUPERVISOR: 'su',
    POLLSTER: 'po'
};

const optionsForUsersSelect = [
    {_id: null, name: '[Todos]'},
    {_id: 'su', name: 'Supervisor'},
    {_id: 'po', name: 'Actualizador'},
    {_id: 'cn', name: 'Coordinador Nacional'},
    {_id: 'ro', name: 'Coordinador Nacional (SL)'},
    {_id: 'co', name: 'Coordinador Provincial'},
    {_id: 'sc', name: 'Subcoordinador Provincial'},
    {_id: 'roc', name: 'Coordinador Provincial (SL)'}
];

export {optionsForUsersSelect};
export {roles};
