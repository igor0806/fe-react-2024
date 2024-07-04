import styles from './Louding.module.css';

const Loading: React.FC = () => (
    <>
        <div className={styles.loading}>
            <div className={styles.loader}></div>
            <p>Loading...</p>
        </div>
    </>
);

export default Loading;
