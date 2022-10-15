import React from 'react'
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
  return (
    <div>
        <h1 className={styles.root}>
            <span>:(</span>
            <br />
            Not Found
        </h1>
        <p className={styles.description}>Sorry</p>
    </div>
  )
}

export default NotFoundBlock;
