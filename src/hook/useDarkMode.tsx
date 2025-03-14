import React from 'react';

const useDarkMode = (): [boolean, (value: boolean) => void] => {
  // Definir o estado inicial a partir do localStorage se existir
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(() => {
    // Recupera a preferência do tema do localStorage
    const storedTheme = localStorage.getItem('darkMode');
    return storedTheme ? JSON.parse(storedTheme) : false; // Retorna false se não houver nada salvo
  });

  // UseEffect para adicionar ou remover a classe 'dark' no documento
  React.useEffect(() => {
    // Adiciona a classe 'dark' no <html> ou remove, com base no estado
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true)); // Armazena a preferência
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(false)); // Armazena a preferência
    }
  }, [isDarkMode]); // Esse efeito é executado sempre que 'isDarkMode' mudar

  // Retorna o estado e a função para alterá-lo
  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;
