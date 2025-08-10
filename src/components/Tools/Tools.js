import styles from './Tools.module.scss'

export default function Tools() {
  const tools = [
    'NEXTJS',
    'REACTJS', 
    'TYPESCRIPT',
    'REACT-TESTING-LIBRARY',
    'CYPRESS',
    'REDUX',
    'REACT-QUERY',
    'SWR',
    'STORYBOOK',
    'CONTENTSTACK',
    'STORYBLOK',
    'WORDPRESS',
    'GIT',
    'JQUERY',
    'HEROKU',
    'NETLIFY',
    'SNOWPLOW',
    'DATADOG'
  ]

  return (
    <div className={styles.tools}>
      <h2>Tools</h2>
      <div className={styles.toolsContainer}>
        {tools.map((tool, index) => (
          <span key={index} className={styles.badge}>
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
} 