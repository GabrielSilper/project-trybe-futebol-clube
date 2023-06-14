import IUser from '../../Interfaces/IUser'

const user1: IUser = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const loginUser1 = {
    email: 'admin@admin.com',
    password: 'secret_admin'
}

export { user1, loginUser1 }
