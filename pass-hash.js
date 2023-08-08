const bcrypt = require('bcrypt');

/**
 * Función de pruebas, para validar la encriptación con bcrypt
 */
async function hashPassword() {
  const myPassword = 'admin123';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
