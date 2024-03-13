

const UserLogOut = () => {

    sessionStorage.removeItem("id");
    window.location.href = '/nav';
}

export default UserLogOut;