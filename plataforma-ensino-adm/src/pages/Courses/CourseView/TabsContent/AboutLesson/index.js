import styles from "./index.module.css";

const AboutLesson = props => {

    const {
        lesson = {},
        ...other
    } = props;

    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <div>Nome</div>
                <div>{lesson?.title}</div>
            </div>
            <div className={styles.block}>
                <div>Descrição</div>
                <div>{lesson?.description}</div>
            </div>
        </div>
    );
}

export default AboutLesson;