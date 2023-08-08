import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = ()=> {
  return(
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing here, sorry...
      </h1>
      <p className={styles.description}>
        Unfortunately, there is no page
      </p>
    </div>
  )

  
}
export  default NotFoundBlock;