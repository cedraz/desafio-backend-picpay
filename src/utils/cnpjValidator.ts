export default function cnpjValidator(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/\D/g, "");

  // Verifica se o CNPJ possui 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso--;
    if (peso < 2) {
      peso = 9;
    }
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 > 9) {
    digito1 = 0;
  }

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso--;
    if (peso < 2) {
      peso = 9;
    }
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 > 9) {
    digito2 = 0;
  }

  // Verifica se os dígitos verificadores são iguais aos dígitos do CNPJ
  if (
    parseInt(cnpj.charAt(12)) === digito1 &&
    parseInt(cnpj.charAt(13)) === digito2
  ) {
    return true;
  } else {
    return false;
  }
}
