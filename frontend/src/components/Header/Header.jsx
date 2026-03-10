import styles from './Header.module.css';

const Header = () => {
  const handleMenuClick = () => {
    window.alert('Menu is not implemented in this version.');
  };

  return (
    <header className={styles.header}>
      <button
        className={styles.menuButton}
        onClick={handleMenuClick}
        aria-label="Open menu"
        tabIndex={0}
      >
        <img src="/icons/menu-icon.svg" alt="" width={24} height={24} aria-hidden="true" />
      </button>
      <div className={styles.avatar}>
        <img
          src="/icons/Sin ti╠ütulo-1.jpg"
          alt="User avatar"
          className={styles.avatarImage}
        />
      </div>
    </header>
  );
};

export default Header;
