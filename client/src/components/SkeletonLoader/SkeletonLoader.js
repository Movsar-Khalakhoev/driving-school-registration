import React from 'react'
import ContentLoader from 'react-content-loader'
import s from './SkeletonLoader.module.sass'

const SkeletonLoader = ({className, loading, children}) => {
  return (
    <div className={`${className} ${s.wrapper}`}>
      {
        loading
          ? <ContentLoader
              className={s.loader}
              backgroundColor={'#bac0cf'}
              foregroundColor={'#95989b'}
              speed={1}
            >
              <rect style={{width: '100%', height: '100%'}} />
            </ContentLoader>
          : children
      }
    </div>
  )
}

export default SkeletonLoader
