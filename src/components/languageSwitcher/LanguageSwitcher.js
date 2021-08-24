import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <>
      {i18n.language === 'en' ? (
        <button
          className={styles.languageButton}
          onClick={() => i18n.changeLanguage('ru')}
        >
          RU
        </button>
      ) : (
        <button
          className={styles.languageButton}
          onClick={() => i18n.changeLanguage('en')}
        >
          EN
        </button>
      )}
    </>
  );
};

export default LanguageSwitcher;
