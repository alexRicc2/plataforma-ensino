import styles from "./index.module.css";

const AboutCourse = props => {

    const {
        description = "",
        ...other
    } = props;

    return (
        <div className={styles.container}>
            <div className={styles.block}>
                <div>Descrição</div>
                <div>{description}</div>
            </div>
        </div>
    );
}

export default AboutCourse;