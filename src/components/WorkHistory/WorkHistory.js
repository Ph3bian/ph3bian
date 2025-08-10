import styles from "./WorkHistory.module.scss";

export default function WorkHistory() {
  return (
    <div className={styles.history}>
      <h2>Work History</h2>
      <div className={styles.work}>
        <div className={styles.workCard}>
          <div>
            <h3>Kudi</h3>
            <p>Full Stack Developer</p>
            <p>July 2019 - June 2020</p>
          </div>
          <div className={styles.workDescription}>
            <p>
              At Kudi (now Nomba), a fintech bringing accessible and affordable
              financial services to Africans, I implemented the new website from
              Figma specifications, built responsive UIs, developed new
              features, and contributed to the company’s design system.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.work}>
        <div className={styles.workCard}>
          <div>
            <h3>Softcom</h3>
            <p>Frontend Developer</p>
            <p>March 2018 - May 2019</p>
          </div>
          <div className={styles.workDescription}>
            <p>
              At Softcom Nigeria, I worked on Eyowo’s B2C web application and
              Merchant Dashboard, helping deliver seamless payment experiences
              for users and businesses. I also worked with the NPOWER team on
              the registration portal and dashboard, solving the challenge of
              managing recruitment processes and people.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.work}>
        <div className={styles.workCard}>
          <div>
            <h3>Seamfix</h3>
            <p>Frontend Developer</p>
            <p>July 2017 - Feb 2018</p>
          </div>
          <div className={styles.workDescription}>
            <p>
              Seamfix is popularly Known as the Identity Champions in Nigeria,
              during my time there I worked on the company website, BioRegistra,
              AutoTopUp and others.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
