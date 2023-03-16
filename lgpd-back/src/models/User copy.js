// users = alunos
class User {
    constructor(userId, userFirstName, userLastName, userEmail, userGender) {
        this.userId = userId;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.userGender = userGender;
    };
}

module.exports = User;
// add em modules: export default User;