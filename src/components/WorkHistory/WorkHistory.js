import styles from './WorkHistory.module.scss'

export default function WorkHistory() {
  return (
    <div className={styles.history}>
      <h2>Work History</h2>
      <div className={styles.work}>
        <div className={styles.workCard}>
          <div>
          <h3>Kudi</h3>
          <p>Full Stack Developer</p>
          <p>July 2019 - Present</p>
          </div>
          <div className={styles.workDescription}>
          <p></p>
          <p>
            I currently work at Kudi, a fintech company that provides
            accessible and affordable financial services for all
            Africans.
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
          <p></p>
          <p>
            At Softcom Nigeria, I worked on the Eyowo team focused on
            building solutions that manage payments. I also worked on
            the NPOWER team that solved the challenge of managing
            recruitment processes and people.
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
          <p></p>
          <p>
            Seamfix is popularly Known as the Identity Champions in
            Nigeria, during my time there I worked on the company
            website, BioRegistra, AutoTopUp and others.
          </p>
        </div>
        </div>
       
      </div>
    </div>
  )
} 