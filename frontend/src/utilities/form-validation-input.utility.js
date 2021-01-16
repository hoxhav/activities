let password = [
    v => !!v || "Password can't be empty",
    v => (v && v.length >=6) || 'Password has to be minimally 6 characters',
];


let required = [
    v => !!v || 'Required',
];


let email=[
    v => ((v && !!v.toString().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/))) || 'Email is invalid'
]




let rules = {
    email,

    required,

    password

}

export  { rules }