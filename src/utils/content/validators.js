const Email = {
    valid: (email) => {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
};

const Password = {
  valid: (password) => {
    if (!password) return true;
    if (!/[0-9]/.test(password)) return false;
    if (!/[!@#\$%\^&]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (password.length < 8) return false;
    return true; 
  }
}

const Phone = {
    valid: (phone) => {
        var regex = /^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4,5}[-\s\.]{0,1}[0-9]{4}$/;
        return regex.test(phone);
    }
};

const Cpf = {
    valid: (cpf) => {
        var regex = /^([0-9]{11})$/;
        return regex.test(cpf);
    }
};

const Cnpj = {
    valid: (cnpj) => {
        var regex = /^([0-9]{14})$/;
        return regex.test(cnpj);
    }
};

const Login = {
    valid: (login) => {
        var regex = /[a-z,A-Z]/;
        return regex.test(login);
    }
};

const DateTime = {
    valid: (dateStr) => {
        const date = new Date(dateStr);
        return date != 'Invalid Date';
    }
}

module.exports = {
    Email,
    DateTime,
    Password,
    Phone,
    Cpf,
    Cnpj,
    Login
}
