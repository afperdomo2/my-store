const bcrypt = require('bcrypt');

/**
 * Función de pruebas para comparar datos encriptados con bcrypt
 */
async function verifyPassword() {
  const myPassword = 'admin123';
  const hash = '$2b$10$acWGO2y5KzZSd61P6DYqcei/D0HovSof5j0eggfNCDr/7fsDvXoHC';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
